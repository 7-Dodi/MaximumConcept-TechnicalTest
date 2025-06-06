// **Api
import { isAxiosError } from "axios";
import { apiMC } from "../connection/axios";

// **Dto
import type { User, creteUser, returnUser } from "../types/user";

// **Método de autenticação
import { getAuthHeaders } from "./index";

// **BaseApi
const baseApi = "/users";

// ========= METODOS SEM AUTENTICAÇÃO ============
// **Service: Criar um usuário
export const createUser = async (user: creteUser) => {
  try {
    await apiMC.post(`${baseApi}`, user);
  } catch (error: unknown) {
    console.error("Error ao criar usuário service:", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao criar usuário");
    } else {
      throw new Error("Erro desconhecido durante a criação de usuário");
    }
  }
};

// **Service: Buscar por id
export const getUserById = async (id: string): Promise<returnUser> => {
  try {
    const response = await apiMC.get(`${baseApi}/by-id/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao pesquisar usuário"
      );
    } else {
      throw new Error("Erro desconhecido durante pesquisa de usuário");
    }
  }
};

// ========= METODOS COM AUTENTICAÇÃO ============
// **Service: Buscar usuário por token
export const getUserByToken = async (token: string): Promise<User> => {
  try {
    const response = await apiMC.get(`${baseApi}/by-token`, getAuthHeaders(token));
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao pesquisar usuário"
      );
    } else {
      throw new Error("Erro desconhecido durante pesquisa de usuário");
    }
  }
}