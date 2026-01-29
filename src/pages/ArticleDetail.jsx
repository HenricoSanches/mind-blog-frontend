import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/posts";
import {
  getCommentsByPost,
  createComment,
} from "../services/comments";
import "./ArticleDetail.css";

export default function ArticleDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function loadComments() {
    try {
      const data = await getCommentsByPost(id);
      setComments(data);
    } catch {
      setComments([]);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const postData = await getPostById(id);
        setPost(postData);
        await loadComments();
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar artigo");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setSending(true);

      await createComment(id, content);

      setContent("");
      await loadComments();
    } catch (err) {
      console.error("ERRO AO ENVIAR COMENTÁRIO:", err);
      console.error("RESPONSE:", err?.response);
      alert("Erro ao enviar comentário");
    } finally {
      setSending(false);
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!post) return null;

  return (
    <main className="article-detail">
      <article className="article-content">
        <h1>{post.title}</h1>

        <p className="meta">
          {post.author} •{" "}
          {new Date(post.created_at).toLocaleDateString("pt-BR")}
        </p>

        {post.banner_image && (
          <img
            src={`http://localhost:3333/uploads/${post.banner_image}`}
            alt={post.title}
            className="article-banner"
          />
        )}

        <p className="article-text">{post.content}</p>
      </article>

      {/* 💬 COMENTÁRIOS */}
      <section className="comments">
        <h2>Comentários</h2>

        {/* FORM */}
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Escreva um comentário..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />

          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Comentar"}
          </button>
        </form>

        {comments.length === 0 && (
          <p className="no-comments">Nenhum comentário ainda.</p>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img
              src={
                comment.user_avatar
                  ? `http://localhost:3333/uploads/${comment.user_avatar}`
                  : `https://ui-avatars.com/api/?name=${comment.user_name}`
              }
              alt={comment.user_name}
              className="comment-avatar"
            />

            <div>
              <strong>{comment.user_name}</strong>
              <span className="comment-date">
                {new Date(comment.created_at).toLocaleDateString("pt-BR")}
              </span>

              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
