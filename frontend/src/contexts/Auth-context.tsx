// **Importações
import { createContext, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// **Types
import type { UserLogin } from "../types/user";

// **ApiService
import * as authService from "../services/auth-service";

// **Contexto de autenticação
interface AuthContextData {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  signIn(loginData: UserLogin): Promise<void>;
  signOut(): void;
}

// **Contexto de autenticação
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// **Props
interface PropsContext {
  children: React.ReactNode;
}

// **Provendo contexto
export const AuthProvider = ({ children }: PropsContext) => {
  const [token, setToken] = React.useState<string | null>(
    Cookies.get("authToken") || null
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadCookieData = async () => {
      const storedToken = Cookies.get("authToken");

      if (storedToken) {
        try {
          setToken(storedToken);
          await checkTokenValidity(storedToken);
        } catch {
          signOut();
        }
      } else {
        setLoading(false);
        if (
          location.pathname !== "/" &&
          location.pathname !== "/register/user" &&
          location.pathname !== "/register/admin"
        ) {
          navigate("/");
        }
      }
    };

    loadCookieData();
  }, []);

  // **Função de verificação de token
  const checkTokenValidity = async (token: string) => {
    try {
      const response = await authService.validateToken(token);
      if (response === 200) {
        setLoading(false);
      } else if (response === 401) {
        await signOut();
        navigate("/");
      } else {
        throw new Error(`Erro ao verificar o token: ${response}`);
      }
    } catch {
      toast.error("Error ao verificar autenticação!");
      signOut();
      navigate("/");
    }
  };

  // **Função de login
  const signIn = async (userLogin: UserLogin) => {
    setLoading(true);
    try {
      toast.loading("Realizando autenticação...");
      const response = await authService.signIn(userLogin);
      const { token } = response;

      Cookies.remove("authToken");
      Cookies.set("authToken", token, {
        expires: 3600,
        sameSite: "Strict",
      });

      toast.dismiss();
      setToken(token);
    } catch {
      toast.dismiss();
      toast.error("Error ao realizar autenticação!");
    } finally {
      setLoading(false);
    }
  };

  // **Função de logout
  const signOut = () => {
    Cookies.remove("authToken");
    Cookies.remove("dataUser");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// **Hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
