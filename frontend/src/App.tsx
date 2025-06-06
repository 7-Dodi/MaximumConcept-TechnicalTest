//Importações
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Estilização
import "react-toastify/dist/ReactToastify.css";

//Contextos
import { AuthProvider } from "./contexts/Auth-context";
import { UserProvider } from "./contexts/User-contexto";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Outlet />
          <ToastContainer theme="dark" />
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
