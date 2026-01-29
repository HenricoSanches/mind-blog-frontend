import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">
        <h1>
          Explore o Futuro da <span>Tecnologia</span>
        </h1>

        <p>
          Artigos sobre IA, desenvolvimento, DevOps e as últimas
          tendências tecnológicas
        </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/articles")}
          >
            Explorar Artigos
          </button>

          <button
            className="btn-outline"
            onClick={() => navigate("/articles/new")}
          >
            Começar a Escrever
          </button>
        </div>
      </div>
    </section>
  );
}
