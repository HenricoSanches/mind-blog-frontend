import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import PostCard from "../components/PostCard/PostCard";

export default function Articles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => alert("Erro ao carregar posts"));
  }, []);

  return (
    <main className="articles">
      <h2>Artigos</h2>

      <div className="articles-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

