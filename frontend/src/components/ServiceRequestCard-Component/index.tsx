// **Importações
import * as React from "react";
import { useNavigate } from "react-router-dom";

// **Styles
import "./style.css";

// **Types
import type { ServiceRequest } from "../../types/serviceRequest";
import type { returnUser } from "../../types/user";

// **Utils
import { formatDate } from "../../utils/formatDates";
import { formatStatus } from "../../utils/formatStatus";
import { formatTypeService } from "../../utils/formtTypeService";

// **Icones
import { GrStatusGood } from "react-icons/gr";

// **Api
import * as userService from "../../services/user-service";

// **Contexto
import { useUser } from "../../contexts/User-contexto";

// **Props
interface ServiceRequestComponentProps {
  serviceRequest: ServiceRequest;
  onRemove: (id: string) => void;
}

export const ServiceRequestCardComponent: React.FC<
  ServiceRequestComponentProps
> = ({ serviceRequest, onRemove }) => {
  const [userData, setUserData] = React.useState<returnUser>();

  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      if (!serviceRequest.requester) return;
      const response = await userService.getUserById(serviceRequest.requester);
      setUserData(response);
    })();
  }, [serviceRequest.requester]);

  return (
    <div
      className={`service-request-component-container container-${serviceRequest.status}`}
    >
      <div className="request-component-header">
        <h3 className="request-header-type">
          {formatTypeService(serviceRequest.type)}
        </h3>

        <span className={`request-header-status ${serviceRequest.status}`}>
          <span>
            <GrStatusGood />
          </span>
          {formatStatus(serviceRequest.status)}
        </span>
      </div>
      <div className="request-component-details">
        <p className="request-component-description">
          {serviceRequest.description}
        </p>

        <p className="request-component-address">
          <strong>Endereço:</strong> {serviceRequest.address}
        </p>

        <p className="resquest-component-requesting">
          <strong>Solicitante:</strong>{" "}
          {userData ? userData.name : "Não informado"}
        </p>

        <p className="request-component-date">
          <strong>Data da solicitação:</strong>{" "}
          {formatDate(new Date(serviceRequest.createdAt))}
        </p>

        {serviceRequest.status != "pendente" && (
          <p className="request-component-date">
            <strong>Data da atualização:</strong>{" "}
            {formatDate(new Date(serviceRequest.updatedAt))}
          </p>
        )}
      </div>
      <div className="request-component-actions">
        {user?.type === "admin" && serviceRequest.status !== "concluido" && (
          <button
            className="request-component-action-button"
            onClick={() => navigate(`/edit-status-request/${serviceRequest.id}`)}
          >
            Editar
          </button>
        )}

        {((user && user.id === serviceRequest.requester && serviceRequest.status === "pendente") ||
          (user?.type === "admin" && serviceRequest.status === "pendente")) && (
          <button
            className="request-component-action-button-cancel"
            onClick={() => {
              if (
                window.confirm("Deseja realmente excluir esta solicitação?")
              ) {
                onRemove(serviceRequest.id);
              }
            }}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
};
