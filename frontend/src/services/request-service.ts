// **Api
import { isAxiosError } from "axios";
import { apiMC } from "../connection/axios";

// **Dto
import type {
  ServiceRequest,
  CreateServiceRequest,
  RequestStatus,
  UpdateServiceRequest
} from "../types/serviceRequest";
import type { FiltersParameters } from "../types/filtersParameters";

// **Método de autenticação
import { getAuthHeaders } from "./index";

// **BaseApi
const baseApi = "/requests";

// ========= METODOS COM AUTENTICAÇÃO ============
// **Service: Criar uma solicitação de serviço
export const createServiceRequest = async (
  token: string,
  serviceRequest: CreateServiceRequest & { status: RequestStatus }
) => {
  try {
    const response = await apiMC.post(
      `${baseApi}`,
      serviceRequest,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao criar solicitação"
      );
    } else {
      throw new Error("Erro desconhecido durante criação de solicitação");
    }
  }
};

// **Service: Buscar todos os serviços
export const getAllServiceRequests = async (
  token: string,
  params?: FiltersParameters
): Promise<ServiceRequest[]> => {
  try {
    const config = {
      ...getAuthHeaders(token),
      params,
    };
    const response = await apiMC.get(`${baseApi}`, config);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao pesquisar solicitações"
      );
    } else {
      throw new Error("Erro desconhecido durante pesquisa de solicitação");
    }
  }
};

// **Service: Buscar uma solicitação de serviço
export const getServiceRequestById = async (
  token: string,
  id: string
): Promise<ServiceRequest> => {
  try {
    const response = await apiMC.get(`${baseApi}/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao pesquisar solicitação"
      );
    } else {
      throw new Error("Erro desconhecido durante pesquisa de solicitação");
    }
  }
};

// **Service: Alterar uma solicitação de serviço
export const updateServiceRequest = async (
  token: string,
  id: string,
  serviceRequest: UpdateServiceRequest
) => {
  try {
    await apiMC.patch(`${baseApi}/${id}`, serviceRequest, getAuthHeaders(token));
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao atualizar solicitação");
    } else {
      throw new Error("Erro desconhecido durante atualização de solicitação");
    }
  }
};

// **Service: Delettar uma solicitação de serviço
export const deleteServiceRequest = async (token: string, id: string) => {
  try {
    await apiMC.delete(`${baseApi}/${id}`, getAuthHeaders(token));
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao deletar solicitação");
    } else {
      throw new Error("Erro desconhecido durante exclusão de solicitação");
    }
  }
}
