// **Importações
import { useNavigate } from "react-router-dom";

// **Styles
import "./style.css";

// **Imagens
import city from "../../assets/city.png";

export const DefaultPage = () => {
  const navigate = useNavigate();
  return (
    <div className="defaultPage-container container">
      <div className="defaultPage-content content-center">
        <img src={city} alt="city" className="apresentation-initial-image" />

        <h1 className="defaultPage-title">
          Esta página ainda está em construção
        </h1>

        <p className="defaultPage-text">
          Por favor, volte para a tela de login, clicando abaixo.
        </p>

        <button
          className="defaultPage-Button"
          onClick={() => navigate("/")}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};
