import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../Container/Container";
import "./Header.css";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <header className="header">
      <Container>
        <div className="header-container">
          <Link to="/" className="logo">
            {"<M/>"}
          </Link>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/articles">Artigos</Link>
          </nav>

          <div className="actions">
            {!user ? (
              <>
                <Link to="/login" className="link">
                  Entrar
                </Link>
                <Link to="/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            ) : (
              <div className="user-menu">
                <button
                  className="avatar"
                  onClick={() => navigate("/settings")}
                >
                  {user.avatar ? (
                    <img
                      src={`http://localhost:3333/uploads/${user.avatar}`}
                      alt="Avatar"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </button>

                <button className="logout" onClick={signOut}>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
