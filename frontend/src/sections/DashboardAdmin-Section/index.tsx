// **Importações
import * as React from "react";
import { toast } from "react-toastify";

// **Styles
import "./style.css";

// **Imagens
import userIcon from "../../assets/user-icon.jpg";

// **Componentes
import { SelectFilterComponent } from "../../components/SelectFilter-Component";
import { ServiceRequestCardComponent } from "../../components/ServiceRequestCard-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";

// **Types
import {
  statusOptions,
  typeOptions,
  dateOptions,
} from "../../types/selectFilters";
import type {
  RequestStatus,
  RequestType,
  ServiceRequest,
} from "../../types/serviceRequest";
import type { User } from "../../types/user";
import type { FiltersParameters } from "../../types/filtersParameters";

// **Icons
import { CiSearch } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

// **Utils
import { formatDateTime } from "../../utils/formatDates";

// **Contexto
import { useUser } from "../../contexts/User-contexto";
import { useAuth } from "../../contexts/Auth-context";

// **ApiService
import * as requestService from "../../services/request-service";
import { MdOutlineUpdate } from "react-icons/md";

export const DashboardAdminSection: React.FC = () => {
  // Estado dos filtros
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [status, setStatus] = React.useState<RequestStatus | "">("");
  const [type, setType] = React.useState<RequestType | "">("");
  const [dateFilter, setDateFilter] = React.useState<string>("");
  const [clearFilters, setClearFilters] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [dataServiceRequests, setDataServiceRequests] = React.useState<
    ServiceRequest[]
  >([]);
  const [visualDataServiceRequests, setVisualDataServiceRequests] =
    React.useState<ServiceRequest[]>([]);
  const [userData, setUserData] = React.useState<User | null>(null);

  const { user } = useUser();
  const { token, signOut } = useAuth();

  // Função para limpar os filtros
  const clearAllFilters = () => {
    setStatus("");
    setType("");
    setDateFilter("");
  };

  // Função para logar o usuário
  const handleLogout = () => {
    signOut();
  };

  // Função para remover solicitação
  const handleRemoveRequest = async (id: string) => {
    if (!token) return;

    try {
      await requestService.deleteServiceRequest(token, id);

      // Atualiza os dados no estado (remove o item excluído)
      setDataServiceRequests((prev) => prev.filter((req) => req.id !== id));
      setVisualDataServiceRequests((prev) =>
        prev.filter((req) => req.id !== id)
      );
      toast.success("Solicitação removida com sucesso.");
    } catch {
      toast.error("Erro ao remover a solicitação.");
    }
  };

  // Efeito para atualizar as solicitações com base nos filtros
  React.useEffect(() => {
    const fetchFilteredRequests = async () => {
      if (!user || !token) return;

      try {
        setLoading(true);
        setUserData(user);

        // Monta os filtros para envio ao backend
        const params: FiltersParameters = {};
        const now = new Date();

        if (status) params.status = status;
        if (type) params.type = type;

        if (dateFilter) {
          let targetDate: Date | null = null;

          switch (dateFilter) {
            case "hoje":
              targetDate = new Date();
              break;
            case "ontem":
              targetDate = new Date();
              targetDate.setDate(now.getDate() - 1);
              break;
            case "semana_passada":
              targetDate = new Date();
              targetDate.setDate(now.getDate() - 7);
              break;
            case "mes_passado":
              targetDate = new Date();
              targetDate.setMonth(now.getMonth() - 1);
              break;
            case "ano_passado":
              targetDate = new Date();
              targetDate.setFullYear(now.getFullYear() - 1);
              break;
          }

          if (targetDate) {
            params.date = targetDate.toISOString();
          }
        }

        const response = await requestService.getAllServiceRequests(
          token,
          params
        );

        // Aplicar o searchTerm localmente
        let filteredData = response;
        if (searchTerm.trim() !== "") {
          const term = searchTerm.toLowerCase();
          filteredData = response.filter((request) =>
            request.type.toLowerCase().includes(term)
          );
        }

        setDataServiceRequests(response); // mantém o "cache" geral
        setVisualDataServiceRequests(filteredData);
      } catch {
        toast.error("Erro ao buscar solicitações!");
      } finally {
        setClearFilters(status !== "" || type !== "" || dateFilter !== "");
        setLoading(false);
      }
    };

    fetchFilteredRequests();
  }, [user, token, status, type, dateFilter, searchTerm]);

  return (
    <section className="dashboard-admin-section-container">
      <div className="dashboard-admin-section-apresentation">
        <div className="dashboard-admin-section-header">
          <h1 className="apresentation-header-title">
            Painel de Administrador
          </h1>

          <div className="apresentation-header-flex-end">
            <div className="apresentation-header-welcome">
              <img
                src={userIcon}
                alt="Ícone de Administrador"
                className="welcome-icon-image"
              />
              <h4 className="apresentation-welcome-name">
                Bem vindo(a), <b>{userData?.name}</b>! <span>;)</span>
              </h4>
            </div>

            <button
              className="dashboard-admin-button-logout"
              onClick={handleLogout}
            >
              <span>
                <AiOutlineLogout />
              </span>
              Sair
            </button>
          </div>
        </div>

        <div className="dashboard-admin-area-input">
          <input
            type="text"
            className="dashboard-admin-input"
            placeholder="Pesquisar por solicitações"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="dashboard-admin-button-search">
            <CiSearch />
          </button>
        </div>

        <div className="dashboard-admin-filters">
          {clearFilters && (
            <button
              className="dashboard-admin-button-clear"
              onClick={clearAllFilters}
            >
              Limpar filtros
            </button>
          )}

          <SelectFilterComponent
            options={statusOptions}
            value={status || "Status"}
            onChange={(value) => setStatus(value as RequestStatus)}
          />
          <SelectFilterComponent
            options={typeOptions}
            value={type || "Tipo"}
            onChange={(value) => setType(value as RequestType)}
          />
          <SelectFilterComponent
            options={dateOptions}
            value={dateFilter || "Data"}
            onChange={(value) => setDateFilter(value)}
          />
        </div>
      </div>

      <div className="dashboard-admin-section-requests">
        <div className="section-requests-header">
          <h2 className="section-requests-header-title">Solicitações</h2>

          {dataServiceRequests.length !== 0 && (
            <p className="section-requests-header-lasted-date">
              <span>
                <MdOutlineUpdate />
              </span>
              {formatDateTime(
                new Date(
                  dataServiceRequests[dataServiceRequests.length - 1].updatedAt
                )
              )}
            </p>
          )}
        </div>

        {loading && <LoadingDatasComponent />}
        {!loading && visualDataServiceRequests.length > 0 && (
          <div className="dashboard-admin-requests-list">
            {visualDataServiceRequests.map((request) => (
              <ServiceRequestCardComponent
                key={request.id}
                serviceRequest={request}
                onRemove={handleRemoveRequest}
              />
            ))}
          </div>
        )}
        {!loading && visualDataServiceRequests.length === 0 && (
          <div className="dashboard-requests-empty">
            <p className="dashboard-requests-empty-message">
              Nenhuma solicitação encontrada
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
