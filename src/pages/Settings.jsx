import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "./Settings.css";

export default function Settings() {
  const { user, signOut } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);

      if (user.avatar) {
        setPreview(`http://localhost:3333/uploads/${user.avatar}`);
      }
    }
  }, [user]);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await api.put("/users/me", formData);

      alert("Perfil atualizado com sucesso!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="settings">
      <h1>Configurações do Perfil</h1>
      <p>Gerencie suas informações pessoais</p>

      <form className="settings-card" onSubmit={handleSubmit}>
        <label className="avatar-upload">
          {preview ? (
            <img src={preview} alt="Avatar" />
          ) : (
            <span>Selecionar foto</span>
          )}
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>

        <div className="field">
          <label>Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>

        <button type="button" className="btn-outline" onClick={signOut}>
          Sair da conta
        </button>
      </form>
    </main>
  );
}
