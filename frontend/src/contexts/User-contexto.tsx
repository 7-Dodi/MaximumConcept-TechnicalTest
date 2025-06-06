// **Importações
import * as React from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// **Types
import type { User, creteUser } from "../types/user";

// **ApiService
import * as userService from "../services/user-service";

// **Contexto de autenticação
import { useAuth } from "./Auth-context";

// **Definindo contexto
interface UserContextData {
  user: User | null;
  loading: boolean;
  createUser(user: creteUser): Promise<void>;
}

// **Contexto
export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

// **Props
interface PropsContext {
  children: React.ReactNode;
}

// **Provendo contexto
export const UserProvider = ({ children }: PropsContext) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

  const { token, signIn } = useAuth();

  // **Busca o usuário pelo token
  const getFindUserByToken = async (token: string) => {
    try {
      const response = await userService.getUserByToken(token);
      setUser(response);

    } catch {
      setUser(null);
      toast.error("Error ao pesquisar usuário!");
    }
  };

  // **Cria um usuário
  const createUser = async (user: creteUser) => {
    setLoading(true);
    try {
      toast.loading("Criando usuário...");
      await userService.createUser(user);

      toast.dismiss();
      toast.success("Usuário criado com sucesso!");

      await signIn({ document: user.document, password: user.password });
    } catch (error) {
      toast.dismiss();
      toast.error("Error ao criar usuário!");
      console.error('Error ao criar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  // **Busca o usuário pelo token
  React.useEffect(() => {
    if (token) {
      getFindUserByToken(token);
    }
  }, [token]);

  // **Redireciona para o dashboard
  React.useEffect(() => {
    if (user) {
      navigate("/dashboard/" + user.type);

      Cookies.set("dataUser", JSON.stringify({
        id: user.id,
        name: user.name,
        type: user.type,
      })); //Obs: Medida não segura, mas funcional (Não salvar dados sensíveis)
      
      if (location.pathname === "/" || location.pathname === "/register/user" || location.pathname === "/register/admin") {
        navigate("/dashboard/" + user.type);
      }

      if (user.type === "admin" && location.pathname === "/create-service-request") {
        navigate("/dashboard/admin");
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

// **Hook para uso do contexto
export const useUser = () => {
  return useContext(UserContext);
};
