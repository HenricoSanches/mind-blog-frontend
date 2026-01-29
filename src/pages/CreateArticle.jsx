import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts";
import "./CreateArticle.css";

export default function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 PREVIEW DA IMAGEM
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // ⚠️ campo TEM que ser "banner" (igual no backend)
    if (image) {
      formData.append("banner", image);
    }

    try {
      setLoading(true);
      await createPost(formData);
      navigate("/articles");
    } catch {
      alert("Erro ao criar artigo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-article">
      <div className="create-card">
        <h1>Novo Artigo</h1>
        <p>Preencha os dados abaixo para publicar um novo artigo</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Título</label>
            <input
              type="text"
              placeholder="Título do artigo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Imagem de capa</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview da capa" />
              </div>
            )}
          </div>

          <div className="field">
            <label>Conteúdo</label>
            <textarea
              rows="8"
              placeholder="Escreva o conteúdo do artigo..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Publicando..." : "Publicar artigo"}
          </button>
        </form>
      </div>
    </main>
  );
}
