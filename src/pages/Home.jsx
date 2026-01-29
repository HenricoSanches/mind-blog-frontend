import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import Hero from "../components/Hero/Hero";
import PostCard from "../components/PostCard/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero />

      <section className="featured">
        <h2>Artigos em destaque</h2>

        <div className="articles-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
