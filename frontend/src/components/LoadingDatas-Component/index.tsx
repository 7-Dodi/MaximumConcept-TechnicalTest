// **Importações
import { FadeLoader } from "react-spinners";

// **Styles
import "./style.css";

export const LoadingDatasComponent = () => {
  return (
    <div className="loading-datas-component-container">
      <div className="loading-datas-component-header">
        <h3>Carregando dados...</h3>
      </div>
      <div className="loading-datas-component-content">
        <div className="loading-spinner">
          <FadeLoader color="var(--button-color)" />
        </div>
      </div>
    </div>
  );
}