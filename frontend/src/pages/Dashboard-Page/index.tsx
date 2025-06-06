// **Importações
import { useParams } from "react-router-dom";

// **Sections
import { DashboardUserSection } from "../../sections/DashboardUser-Section";
import { DashboardAdminSection } from "../../sections/DashboardAdmin-Section";

export const DashboardPage = () => {
  const { type } = useParams<{ type: string }>();
  return (
    <div className="dashboard-page-container container">
      <div className="dashboard-page-content content-center">
        {type === "user" ? (
          <DashboardUserSection />
        ) : (
          <DashboardAdminSection/>
        )}
      </div>
    </div>
  );
};
