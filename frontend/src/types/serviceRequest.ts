// **Importações
import type { User } from "./user";

//Definindo tipo de estado para o serviço de requisição
export type RequestType = "troca_lampada" | "tapa_buraco";
export type RequestStatus = "pendente" | "em_andamento" | "concluido";

// Definindo a interface para o serviço de requisição
export interface ServiceRequest {
  id: string;
  type: RequestType;
  address: string;
  description: string;
  requester: User; 
  status: RequestStatus; 
  createdAt: Date;
  updatedAt: Date;
};

// Definindo tipo para a criação de um serviço de requisição
export interface CreateServiceRequest {
  type: RequestType;
  address: string;
  description: string;
}