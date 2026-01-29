import { Link } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ post }) {
  return (
    <Link to={`/articles/${post.id}`} className="post-card">
      <img
        src={
          post.banner_image
            ? `http://localhost:3333/uploads/${post.banner_image}`
            : "https://picsum.photos/600/300"
        }
        alt={`Banner do artigo ${post.title}`}
        className="post-image"
      />

      <div className="post-content">
        <span className="post-tag">Desenvolvimento Web</span>

        <h3>{post.title}</h3>

        <p>
          {post.content.length > 120
            ? post.content.slice(0, 120) + "..."
            : post.content}
        </p>

        <div className="post-footer">
          <span>{post.author ?? "Autor desconhecido"}</span>
          <span>
            • {new Date(post.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
    </Link>
  );
}
