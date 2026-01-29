import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/posts";
import "./CreateArticle.css";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("banner", image); // 🔥 NOME CORRETO
    }

    try {
      await updatePost(id, formData);
      navigate(`/articles/${id}`);
    } catch {
      alert("Erro ao atualizar artigo");
    }
  }

  if (loading) return null;

  return (
    <main className="create-article">
      <div className="create-card">
        <h1>Editar Artigo</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Imagem de capa</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="field">
            <label>Conteúdo</label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button className="btn-primary">Salvar alterações</button>
        </form>
      </div>
    </main>
  );
}
