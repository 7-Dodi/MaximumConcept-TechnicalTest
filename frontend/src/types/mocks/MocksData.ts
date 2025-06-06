// Importando tipos
import type { User } from "../user"; // ou ajuste o caminho do seu arquivo de tipos
import type { ServiceRequest } from "../serviceRequest";

//Mocks de usuários
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "João Silva",
    document: "123.456.789-00",
    documentType: "cpf",
    password: "senha123",
    type: "user",
    createdAt: new Date("2025-05-01T10:00:00"),
    updatedAt: new Date("2025-05-01T10:00:00"),
  },
  {
    id: "u2",
    name: "Empresa XYZ Ltda",
    document: "12.345.678/0001-99",
    documentType: "cnpj",
    password: "empresaxyz@123",
    type: "user",
    createdAt: new Date("2025-05-02T09:00:00"),
    updatedAt: new Date("2025-05-02T09:00:00"),
  },
  {
    id: "u3",
    name: "Maria Oliveira",
    document: "987.654.321-00",
    documentType: "cpf",
    password: "maria@2025",
    type: "user",
    createdAt: new Date("2025-05-03T11:15:00"),
    updatedAt: new Date("2025-05-03T11:15:00"),
  },
  {
    id: "u4",
    name: "Carlos Souza",
    document: "111.222.333-44",
    documentType: "cpf",
    password: "carloss123",
    type: "user",
    createdAt: new Date("2025-05-04T12:30:00"),
    updatedAt: new Date("2025-05-04T12:30:00"),
  },
];

//Mocks de solicitações
export const mockServiceRequests: ServiceRequest[] = [
  {
    id: "1",
    type: "troca_lampada",
    address: "Rua das Flores, 123",
    description: "A lâmpada do poste está queimada há dias.",
    requester: mockUsers[0],
    status: "pendente",
    createdAt: new Date("2025-05-25T10:30:00"),
    updatedAt: new Date("2025-05-25T10:30:00"),
  },
  {
    id: "2",
    type: "tapa_buraco",
    address: "Av. Central, 987",
    description: "Buraco grande na avenida está causando acidentes.",
    requester: mockUsers[1],
    status: "em_andamento",
    createdAt: new Date("2025-05-20T14:15:00"),
    updatedAt: new Date("2025-05-28T09:00:00"),
  },
  {
    id: "3",
    type: "troca_lampada",
    address: "Travessa da Paz, 45",
    description: "Poste piscando constantemente à noite.",
    requester: mockUsers[2],
    status: "concluido",
    createdAt: new Date("2025-05-15T08:00:00"),
    updatedAt: new Date("2025-05-18T12:00:00"),
  },
  {
    id: "4",
    type: "tapa_buraco",
    address: "Rua do Comércio, 22",
    description: "Muitos buracos na rua atrapalham o tráfego.",
    requester: mockUsers[3],
    status: "pendente",
    createdAt: new Date("2025-05-30T07:45:00"),
    updatedAt: new Date("2025-05-30T07:45:00"),
  },
];