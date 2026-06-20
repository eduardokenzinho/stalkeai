import json
import os
import re
import sys
from urllib.parse import quote

import instaloader


USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9._]{1,30}$")


def write_json(payload, status=0):
    print(json.dumps(payload, ensure_ascii=True, default=str))
    sys.exit(status)


def make_loader():
    loader = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        quiet=True,
    )
    loader.context.request_timeout = int(os.environ.get("INSTALOADER_TIMEOUT", "18"))

    session_file = os.environ.get("INSTALOADER_SESSION_FILE")
    session_username = os.environ.get("INSTALOADER_SESSION_USERNAME")
    if session_username:
        loader.load_session_from_file(session_username, session_file)

    return loader


def normalize_post(post, profile):
    caption = post.caption or ""
    post_image = post.url or ""
    avatar = profile.profile_pic_url or ""
    proxied_image = f"/api/proxy-image?raw=1&url={quote(post_image, safe='')}" if post_image else ""
    return {
        "username": profile.username,
        "fullName": profile.full_name or profile.username,
        "avatar": avatar,
        "avatarRaw": avatar,
        "postImage": proxied_image,
        "postImageRaw": post_image,
        "likes": post.likes or 0,
        "comments": post.comments or 0,
        "time": post.date_utc.isoformat() if post.date_utc else "",
        "description": caption[:220],
        "postUrl": f"https://www.instagram.com/p/{post.shortcode}/",
        "isVideo": bool(post.is_video),
        "source": "instaloader",
    }


def main():
    if len(sys.argv) < 2:
        write_json({"success": False, "error": "Username e obrigatorio"}, 1)

    username = sys.argv[1].strip().lstrip("@")
    if not USERNAME_PATTERN.match(username):
        write_json({"success": False, "error": "Username invalido"}, 1)

    limit = 5
    if len(sys.argv) >= 3:
        try:
            limit = max(1, min(int(sys.argv[2]), 5))
        except ValueError:
            limit = 5

    max_scan = max(limit, min(int(os.environ.get("INSTALOADER_FOLLOWING_SCAN_LIMIT", "25")), 50))
    loader = make_loader()

    try:
        target = instaloader.Profile.from_username(loader.context, username)
        profile_payload = {
            "username": target.username,
            "name": target.full_name or target.username,
            "avatar": target.profile_pic_url or "",
            "bio": target.biography or "",
            "posts": target.mediacount or 0,
            "followers": target.followers or 0,
            "following": target.followees or 0,
            "is_verified": bool(target.is_verified),
            "is_private": bool(target.is_private),
            "external_link": target.external_url,
        }

        if target.is_private:
            write_json({
                "success": False,
                "configured": True,
                "source": "instaloader",
                "username": username,
                "profile": profile_payload,
                "perfil": profile_payload,
                "following": [],
                "seguindo": [],
                "posts": [],
                "message": "Perfil privado",
            })

        following = []
        following_profiles = []
        posts = []

        for index, followed_profile in enumerate(target.get_followees()):
            if index >= max_scan or len(following_profiles) >= limit:
                break

            following.append({
                "username": followed_profile.username,
                "fullName": followed_profile.full_name or followed_profile.username,
                "avatar": followed_profile.profile_pic_url or "",
                "isPrivate": bool(followed_profile.is_private),
                "isVerified": bool(followed_profile.is_verified),
            })
            following_profiles.append(followed_profile)

        for followed_profile in following_profiles:
            if followed_profile.is_private:
                continue

            try:
                first_post = next(followed_profile.get_posts(), None)
            except Exception:
                first_post = None

            if first_post and first_post.url:
                posts.append(normalize_post(first_post, followed_profile))

        write_json({
            "success": len(posts) > 0,
            "configured": True,
            "source": "instaloader",
            "username": username,
            "profile": profile_payload,
            "perfil": profile_payload,
            "following": following,
            "seguindo": [profile["username"] for profile in following],
            "posts": posts,
            "message": "" if posts else "Nenhum post publico encontrado nos perfis seguidos",
        })
    except instaloader.exceptions.LoginRequiredException:
        write_json({
            "success": False,
            "configured": False,
            "source": "instaloader",
            "posts": [],
            "message": "Instaloader precisa de sessao para listar quem esse perfil segue",
        }, 3)
    except Exception as error:
        write_json({
            "success": False,
            "configured": False,
            "source": "instaloader",
            "posts": [],
            "error": str(error),
        }, 4)


if __name__ == "__main__":
    main()
