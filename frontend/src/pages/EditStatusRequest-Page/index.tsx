// **Importações
import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// **Styles
import "./style.css";

// **Components
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";

// **Types
import type { RequestStatus, ServiceRequest } from "../../types/serviceRequest";

// **Api
import * as requestService from "../../services/request-service";

// **Contexto
import { useAuth } from "../../contexts/Auth-context";
import { useUser } from "../../contexts/User-contexto";

// **Utils
import { formatTypeService } from "../../utils/formtTypeService";
import { getNextStatuses } from "../../utils/getNextStatus";

export const EditStatusRequestPage = () => {
  const [request, setRequest] = React.useState<ServiceRequest>();
  const [loading, setLoading] = React.useState(true);
  const [newStatus, setNewStatus] = React.useState<RequestStatus>();

  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        if (!id || !token) return;
        setLoading(true);

        const response = await requestService.getServiceRequestById(token, id);
        setRequest(response);
      } catch {
        toast.error("Error ao buscar solicitação!");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  React.useEffect(() => {
    if (!user) return;
    if (user.type === "user") {
      navigate("/dashboard/user");
    }
  },[user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !id || !request) {
      toast.error("Dados inválidos. Tente novamente.");
      return;
    }

    if (!newStatus || newStatus === request.status) {
      toast.info("Selecione um novo status para continuar.");
      return;
    }

    try {
      await requestService.updateServiceRequest(token, id, {
        status: newStatus,
      });
      toast.success("Status atualizado com sucesso!");

      navigate("/dashboard/admin");
    } catch {
      toast.error("Erro ao atualizar status da solicitação.");
    }
  };

  return (
    <div className="edit-status-request-container container">
      <BackPage />

      <div className="edit-status-request-content content-center">
        {loading ? <LoadingDatasComponent /> : ""}
        {request ? (
          <>
            <div className="edit-status-request-header">
              <h1 className="edit-status-request-header-title">
                {formatTypeService(request.type)} ;)
              </h1>
              <h3 className="edit-status-request-header-subtitle">
                Editar Status da Solicitação
              </h3>

              <p className="edit-status-request-header-apresentation">
                Esta solicitação está com o <strong>status:</strong>{" "}
                <span className={`status-${request.status}`}>
                  {request.status}
                </span>
              </p>
              <p className="edit-status-request-header-apresentation">
                Por favor, selecione o novo status da solicitação:
              </p>
            </div>

            <div className="edit-status-request-form">
              <form className="edit-status-form" onSubmit={handleSubmit}>
                <label className="edit-status-form-label">
                  <span className="edit-status-form-span">Status:</span>

                  <select
                    defaultValue={request.status}
                    className="edit-status-form-select"
                    onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                  >
                    {getNextStatuses(request.status).map((status, index) => (
                      <option key={index} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button type="submit" className="edit-status-form-button">
                  Salvar
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="reques-not-found">
            <h3>Solicitação não encontrada!</h3>

            <p>
              Por favor, volte para a tela de solicitações, clicando{" "}
              <a href="/dashboard/admin">aqui</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
