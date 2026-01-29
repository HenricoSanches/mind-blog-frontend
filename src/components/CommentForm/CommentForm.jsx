import { useState } from "react";
import { createComment } from "../../services/comments";
import "./CommentForm.css";

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setLoading(true);

      await createComment(postId, content);

      setContent("");
      onCommentAdded(); // 🔥 recarrega comentários
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar comentário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Escreva um comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
}
