// **Importações
import * as React from "react";
import { useNavigate } from "react-router-dom";

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

// **Icons
import { CiSearch } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

// **Mock
import { mockServiceRequests } from "../../types/mocks/MocksData";
import { MdOutlineUpdate } from "react-icons/md";

export const DashboardAdminSection: React.FC = () => {
  // Estado dos filtros
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [status, setStatus] = React.useState<RequestStatus | "">("");
  const [type, setType] = React.useState<RequestType | "">("");
  const [dateFilter, setDateFilter] = React.useState<string>("");
  const [clearFilters, setClearFilters] = React.useState<boolean>(false);
  const [dataServiceRequests, setDataServiceRequests] = React.useState<
    ServiceRequest[]
  >([]);
  const [visualDataServiceRequests, setVisualDataServiceRequests] =
    React.useState<ServiceRequest[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  // Função para limpar os filtros
  const clearAllFilters = () => {
    setStatus("");
    setType("");
    setDateFilter("");
  };

  // Função para logar o usuário
  const handleLogout = () => {
    navigate("/");
  };

  // Efeito para atualizar as solicitações com base nos filtros
  React.useEffect(() => {
    setClearFilters(status !== "" || type !== "" || dateFilter !== "");
    let filteredRequests = [...dataServiceRequests];
    setLoading(true);

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filteredRequests = filteredRequests.filter((request) =>
        request.type.toLowerCase().includes(term)
      );
    }

    if (status) {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === status
      );
    }

    if (type) {
      filteredRequests = filteredRequests.filter(
        (request) => request.type === type
      );
    }

    if (dateFilter) {
      const now = new Date();

      filteredRequests = filteredRequests.filter((request) => {
        const created = new Date(request.createdAt);
        const diffInDays = Math.floor(
          (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
        );

        switch (dateFilter) {
          case "hoje":
            return created.toDateString() === now.toDateString();
          case "ontem": {
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return created.toDateString() === yesterday.toDateString();
          }
          case "semana_passada":
            return diffInDays <= 7;
          case "mes_passado":
            return diffInDays <= 30;
          case "ano_passado":
            return created.getFullYear() === now.getFullYear() - 1;
          default:
            return true;
        }
      });
    }

    setVisualDataServiceRequests(filteredRequests);
    setLoading(false);
  }, [status, type, dateFilter, dataServiceRequests, searchTerm]);

  // Simulação de busca de solicitações com base nos filtros
  React.useEffect(() => {
    setLoading(true);
    setDataServiceRequests(mockServiceRequests);
    setVisualDataServiceRequests(mockServiceRequests);
    setLoading(false);
  }, []);

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
                Bem vindo(a), <b>Debóra</b>! <span>;)</span>
              </h4>
            </div>

            <button className="dashboard-admin-button-logout" onClick={handleLogout}>
              <span><AiOutlineLogout /></span>
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

          <p className="section-requests-header-lasted-date">
            <span>
              <MdOutlineUpdate />
            </span>
            Atualizado às: 00:00, de 00/00/0000
          </p>
        </div>

        {loading && <LoadingDatasComponent />}
        {!loading && visualDataServiceRequests.length > 0 && (
          <div className="dashboard-admin-requests-list">
            {visualDataServiceRequests.map((request) => (
              <ServiceRequestCardComponent
                key={request.id}
                serviceRequest={request}
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
