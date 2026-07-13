import { useState, useEffect } from "react";
import FeedHeader from "../components/FeedComponents/FeedHeader";
import StoriesBar from "../components/FeedComponents/StoriesBar";
import FeedPost from "../components/FeedComponents/FeedPost";
import BottomNav from "../components/FeedComponents/BottomNav";
import TrialBanner from "../components/TrialComponents/TrialBanner";
import "./Feed.css";

import avChat2 from "../assets/feed/chat2.png";
import avChat1 from "../assets/feed/chat1.png";
import avChat3 from "../assets/feed/chat3.png";
import av1 from "../assets/feed/av-fallback-1.jpg";
import av2 from "../assets/feed/av-fallback-2.jpg";
import av3 from "../assets/feed/av-fallback-3.jpg";
import av4 from "../assets/feed/av-fallback-4.jpg";
import av5 from "../assets/feed/av-fallback-5.jpg";
import av6 from "../assets/feed/av-fallback-6.jpg";
import av7 from "../assets/feed/av-fallback-7.jpg";
import av8 from "../assets/feed/av-fallback-8.jpg";
import av9 from "../assets/feed/av-fallback-9.jpg";
import av10 from "../assets/feed/av-fallback-10.jpg";
import av11 from "../assets/feed/av-fallback-11.jpg";
import av12 from "../assets/feed/av-fallback-12.jpg";
import avatarNicolas from "../assets/feed/avatarnicolas.jpg";
import postagemNicolas from "../assets/feed/postagemnicolas.jpg";

const POSTS = [
  { username: "An*****", avatar: avChat2, postImage: av5, likes: 204, comments: 8, time: "26 de janeiro de 2025", description: "Mais um dia incrível 🌅✨" },
  { username: "Ni*****", avatar: avatarNicolas, postImage: postagemNicolas, likes: 1600000, comments: 34700, time: "24 de janeiro de 2025", imageBlur: 8, avatarBlur: 2 },
  { username: "Br*****", avatar: avChat3, postImage: av8, likes: 312, comments: 5, time: "19 de janeiro de 2025" },
  { username: "Me*****", avatar: av7, postImage: av2, likes: 156, comments: 3, time: "12 de janeiro de 2025" },
  { username: "Pe*****", avatar: av3, postImage: av11, likes: 67, comments: 2, time: "3 de janeiro de 2025" },
  { username: "Th*****", avatar: av9, postImage: av4, likes: 421, comments: 12, time: "28 de dezembro de 2024" },
  { username: "La*****", avatar: av4, postImage: av10, likes: 178, comments: 6, time: "21 de dezembro de 2024" },
  { username: "En*****", avatar: av1, postImage: av6, likes: 95, comments: 1, time: "14 de dezembro de 2024" },
  { username: "Be*****", avatar: av8, postImage: av3, likes: 543, comments: 14, time: "5 de dezembro de 2024" },
  { username: "So*****", avatar: av2, postImage: av9, likes: 267, comments: 7, time: "27 de novembro de 2024" },
  { username: "Le*****", avatar: av5, postImage: av1, likes: 134, comments: 4, time: "18 de novembro de 2024" },
  { username: "Ma*****", avatar: av6, postImage: av12, likes: 389, comments: 9, time: "9 de novembro de 2024" },
  { username: "Ga*****", avatar: av10, postImage: av7, likes: 72, comments: 2, time: "31 de outubro de 2024" },
  { username: "Is*****", avatar: av11, postImage: avChat1, likes: 451, comments: 11, time: "14 de outubro de 2024" },
  { username: "Ra*****", avatar: av12, postImage: avChat2, likes: 213, comments: 5, time: "2 de outubro de 2024" },
];

const FOLLOWED_DESCRIPTIONS = [
  "Novo post publicado recentemente",
  "Publicacao com muita interacao",
  "Atividade recente no perfil",
  "Post salvo entre as publicacoes recentes",
  "Perfil seguido com conteudo privado",
];

function readTargetUsername() {
  try {
    return localStorage.getItem("current_username") || "";
  } catch {
    return "";
  }
}

function getApiBase() {
  const envBase = process.env.REACT_APP_API_BASE;
  if (envBase && envBase.trim()) {
    return envBase.trim().replace(/\/+$/, "");
  }
  return "";
}

function maskUsername(username) {
  if (!username) return "Perfil";
  if (username.length <= 2) return `${username[0] || ""}*****`;
  return `${username.slice(0, 2)}*****`;
}

function toProxyImageUrl(imageUrl) {
  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${getApiBase()}/api/proxy-image?raw=1&url=${encodeURIComponent(imageUrl)}`;
}

function randomDateWithinLastMonths(months = 3) {
  const now = new Date();
  const past = new Date(now);
  past.setMonth(now.getMonth() - months);
  const timestamp = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildPosts(targetUsername, city, realPosts = [], followedProfiles = []) {
  const targetLabel = targetUsername ? `Seguido por @${targetUsername}` : "Perfil seguido";

  if (realPosts.length > 0) {
    const mappedPosts = realPosts.map((post, index) => ({
      username: post.fullName || maskUsername(post.username) || POSTS[index]?.username || "Perfil seguido",
      avatar: toProxyImageUrl(post.avatar) || POSTS[index]?.avatar,
      postImage: post.postImage || toProxyImageUrl(post.postImageRaw) || POSTS[index]?.postImage,
      likes: post.likes || 0,
      comments: post.comments || 0,
      time: post.time ? new Date(post.time).toLocaleDateString("pt-BR") : randomDateWithinLastMonths(3),
      location: post.username ? `@${post.username} - ${targetLabel}` : targetLabel,
      description: post.description || FOLLOWED_DESCRIPTIONS[index] || "Post recente do perfil seguido",
      imageBlur: 8 + index,
      avatarBlur: 0,
    }));

    return shuffleArray([
      ...mappedPosts,
      ...POSTS.slice(mappedPosts.length).map(post => ({
        ...post,
        time: randomDateWithinLastMonths(3),
      })),
    ]);
  }

  if (followedProfiles.length > 0) {
    const mappedProfiles = followedProfiles.slice(0, 5).map((profile, index) => ({
      username: profile.fullName || maskUsername(profile.username) || POSTS[index]?.username || "Perfil seguido",
      avatar: toProxyImageUrl(profile.avatarRaw || profile.avatar) || POSTS[index]?.avatar,
      postImage: POSTS[index]?.postImage,
      likes: POSTS[index]?.likes || 0,
      comments: POSTS[index]?.comments || 0,
      time: randomDateWithinLastMonths(3),
      location: profile.username ? `@${profile.username} - ${targetLabel}` : targetLabel,
      description: profile.isPrivate
        ? "Perfil seguido encontrado, mas o conteudo esta privado"
        : "Perfil seguido encontrado; post publico indisponivel",
      imageBlur: POSTS[index]?.imageBlur ?? 11 + index,
      avatarBlur: 0,
    }));

    return shuffleArray([
      ...mappedProfiles,
      ...POSTS.slice(mappedProfiles.length).map(post => ({
        ...post,
        time: randomDateWithinLastMonths(3),
      })),
    ]);
  }

  return shuffleArray(
    POSTS.map((post, index) => {
      if (index >= 5) {
        return {
          ...post,
          time: randomDateWithinLastMonths(3),
        };
      }

      return {
        ...post,
        time: randomDateWithinLastMonths(3),
        location: index === 0 && city ? `${targetLabel} - ${city}` : targetLabel,
        description: FOLLOWED_DESCRIPTIONS[index],
        imageBlur: post.imageBlur ?? 11 + index,
        avatarBlur: post.avatarBlur ?? 2,
      };
    })
  );
}

function getFeedStorageKey(username) {
  return `feed_posts_${username}`;
}

export default function Feed() {
  const [city, setCity] = useState("");
  const [targetUsername] = useState(readTargetUsername);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [followedProfiles, setFollowedProfiles] = useState([]);
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data?.city) {
          setCity(data.city);
          return;
        }
      } catch {}
      try {
        const res = await fetch("https://wtfismyip.com/json", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data?.YourFuckingLocation) {
          const parts = data.YourFuckingLocation.split(",");
          setCity((parts[0] || "").trim());
        }
      } catch {}
    }
    fetchLocation();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!targetUsername) return;

    const controller = new AbortController();
    async function fetchFollowedPosts() {
      try {
        const apiBase = getApiBase();
        const res = await fetch(`${apiBase}/api/followed-posts?username=${encodeURIComponent(targetUsername)}&limit=5`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        setFollowedPosts(Array.isArray(data?.posts) ? data.posts.slice(0, 5) : []);
        setFollowedProfiles(Array.isArray(data?.following) ? data.following.slice(0, 5) : []);
      } catch {}
    }

    fetchFollowedPosts();
    return () => controller.abort();
  }, [targetUsername]);

  useEffect(() => {
    if (!targetUsername) return;

    const storageKey = getFeedStorageKey(targetUsername);
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        setFeedItems(JSON.parse(stored));
        return;
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const items = buildPosts(targetUsername, city, followedPosts, followedProfiles);
    localStorage.setItem(storageKey, JSON.stringify(items));
    setFeedItems(items);
  }, [targetUsername, city, followedPosts, followedProfiles]);

  useEffect(() => {
    const trialActive = localStorage.getItem('trial_active') === 'true';
    const trialExpires = localStorage.getItem('trial_expires');
    const trialStart = localStorage.getItem('trial_start');

    if (trialActive) {
      const now = Date.now();
      const start = trialStart ? parseInt(trialStart, 10) : now;
      const expiresAt = start + 30 * 1000;
      const currentExpires = trialExpires ? parseInt(trialExpires, 10) : null;

      localStorage.setItem('trial_start', start.toString());

      if (!currentExpires || currentExpires > expiresAt) {
        localStorage.setItem('trial_expires', expiresAt.toString());
      }
    }
  }, []);

  return (
    <div className="feed-page">
      <FeedHeader />

      <main className="feed-content">
        <StoriesBar followedProfiles={followedProfiles} />
        {feedItems.map((post, index) => (
          <FeedPost
            key={index}
            username={post.username}
            avatar={post.avatar}
            likes={post.likes}
            comments={post.comments}
            time={post.time}
            blurLevel={index}
            location={post.location}
            description={post.description}
            postImage={post.postImage}
            imageBlur={post.imageBlur}
            avatarBlur={post.avatarBlur}
          />
        ))}
      </main>

      <TrialBanner />
      <BottomNav />
    </div>
  );
}
