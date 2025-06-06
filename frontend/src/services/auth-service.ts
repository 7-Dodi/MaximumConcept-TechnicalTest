// **Api
import { isAxiosError } from "axios";
import { apiMC } from "../connection/axios";

// **Dto
import type { UserLogin } from "../types/user";
import type { AuthReturn } from "../types/authReturn";

// **Método de autenticação
import { getAuthHeaders } from "./index";

// **BaseApi
const baseApi = "/auth";

// **Service: Autenticar usuários
export const signIn = async (userLogin: UserLogin): Promise<AuthReturn> => {
  try {
    const response = await apiMC.post(`${baseApi}/login`, userLogin);
    return response.data;
  } catch (error: unknown) {
    console.error("Error ao autenticar usuário service:", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao autenticar usuário"
      );
    } else {
      throw new Error("Erro desconhecido durante a autenticação");
    }
  }
};

// **Service: Verificar se o token é válido
export const validateToken = async (token: string): Promise<number> => {
  try {
    const response = await apiMC.get(`${baseApi}/verify`, getAuthHeaders(token));
    return response.status;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao validar token");
    } else {
      throw new Error("Erro desconhecido durante validação de token");
    }
  }
};
