import { useEffect, useState } from "react";
import api from "../services/api";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        alert("Erro ao carregar posts");
      }
    }

    loadPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {post.banner_image && (
            <img
              src={`http://localhost:3333/uploads/${post.banner_image}`}
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;
