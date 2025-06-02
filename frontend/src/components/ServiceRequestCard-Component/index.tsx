// **Importações
import * as React from "react";

// **Styles
import "./style.css";

// **Types
import type { ServiceRequest } from "../../types/serviceRequest";

// **Utils
import { formatDate } from "../../utils/formatDates";
import { formatStatus } from "../../utils/formatStatus";
import { formatTypeService } from "../../utils/formtTypeService";

// **Icones
import { GrStatusGood } from "react-icons/gr";

// **Props
interface ServiceRequestComponentProps {
  serviceRequest: ServiceRequest;
}

export const ServiceRequestCardComponent: React.FC<
  ServiceRequestComponentProps
> = ({ serviceRequest }) => {
  return (
    <div className={`service-request-component-container container-${serviceRequest.status}`}>
      <div className="request-component-header">
        <h3 className="request-header-type">{formatTypeService(serviceRequest.type)}</h3>

        <span className={`request-header-status ${serviceRequest.status}`}>
          <span><GrStatusGood /></span>
          {formatStatus(serviceRequest.status)}
        </span>
      </div>
      <div className="request-component-details">
        <p className="request-component-description">{serviceRequest.description}</p>

        <p className="resquest-component-requesting">
          <strong>Solicitante:</strong> {serviceRequest.requesterName}
        </p>

        <p className="request-component-date">
          <strong>Data da solicitação:</strong> {formatDate(serviceRequest.createdAt)}
        </p>

        {serviceRequest.status != "pendente" && (
          <p className="request-component-date">
          <strong>Data da atualização:</strong> {formatDate(serviceRequest.updatedAt)}
        </p>
        )}
      </div>
      <div className="request-component-actions">
        <button className="request-component-action-button">
          Detalhes
        </button>
        <button className="request-component-action-button-cancel">
          Excluir
        </button>
      </div>
    </div>
  );
};
