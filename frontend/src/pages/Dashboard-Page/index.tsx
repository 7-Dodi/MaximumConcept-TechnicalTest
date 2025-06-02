// **Importações
import * as React from "react";
import { useParams } from "react-router-dom";

// **Sections
import { DashboardUserSection } from "../../sections/DashboardUser-Section";

export const DashboardPage = () => {
  const { type } = useParams<{ type: string }>();
  return (
    <div className="dashboard-page-container container">
      <div className="dashboard-page-content content-center">
        {type === "user" ? (
          <DashboardUserSection />
        ) : (
          <>
            <h1 className="dashboard-page-title">Dashboard Admin</h1>
            <p className="dashboard-page-description">
              Bem-vindo ao painel de administração. Aqui você pode gerenciar usuários, visualizar relatórios e muito mais.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
