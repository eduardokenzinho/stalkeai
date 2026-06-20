import json
import os
import re
import sys

import instaloader


USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9._]{1,30}$")


def write_json(payload, status=0):
    print(json.dumps(payload, ensure_ascii=True))
    sys.exit(status)


def main():
    if len(sys.argv) < 2:
        write_json({"success": False, "error": "Username e obrigatorio"}, 1)

    username = sys.argv[1].strip().lstrip("@")
    if not USERNAME_PATTERN.match(username):
        write_json({"success": False, "error": "Username invalido"}, 1)

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

    try:
        profile = instaloader.Profile.from_username(loader.context, username)
        write_json({
            "success": True,
            "source": "instaloader",
            "profile": {
                "username": profile.username,
                "name": profile.full_name or profile.username,
                "avatar": profile.profile_pic_url or "",
                "avatar_hd": profile.profile_pic_url or "",
                "bio": profile.biography or "",
                "posts": profile.mediacount or 0,
                "followers": profile.followers or 0,
                "following": profile.followees or 0,
                "is_verified": bool(profile.is_verified),
                "is_private": bool(profile.is_private),
                "external_link": profile.external_url,
            },
        })
    except instaloader.exceptions.ProfileNotExistsException:
        write_json({"success": False, "error": "Perfil nao encontrado"}, 2)
    except instaloader.exceptions.LoginRequiredException:
        write_json({"success": False, "error": "Login requerido pelo Instagram"}, 3)
    except Exception as error:
        write_json({"success": False, "error": str(error)}, 4)


if __name__ == "__main__":
    main()
