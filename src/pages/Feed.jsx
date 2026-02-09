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

export default function Feed() {
  const [city, setCity] = useState("");

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

  return (
    <div className="feed-page">
      <FeedHeader />

      <main className="feed-content">
        <StoriesBar />
        {POSTS.map((post, index) => (
          <FeedPost
            key={index}
            username={post.username}
            avatar={post.avatar}
            likes={post.likes}
            comments={post.comments}
            time={post.time}
            blurLevel={index}
            location={index === 0 && city ? city : post.location}
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