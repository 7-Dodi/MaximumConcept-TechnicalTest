//Definindo tipo de estado para o serviço de requisição
export type RequestType = "troca_lampada" | "tapa_buraco";
export type RequestStatus = "pendente" | "em_andamento" | "concluido";

// Definindo a interface para o serviço de requisição
export interface ServiceRequest {
  id: string;
  type: RequestType; // Tipo da solicitação
  address: string; // Endereço do local
  description: string; // Descrição detalhada
  requesterName: string; // Nome do solicitante
  document: string; // CPF ou CNPJ
  documentType: "cpf" | "cnpj"; // Para validação
  status: RequestStatus; // Status atual
  createdAt: Date;
  updatedAt: Date;
}

//Dúvidas quando a esse objeto:
// 1 - O tipo será sempre um dos dois tipos definidos? Ou o usuário pode criar novos tipos de requisição?
// 2 - O solicitação tem que armazenar o nome e documento do solicitante? Não poder ser apenas o ID do usuário que fez a solicitação?
// 3 - O endereço será como uma representação textual do local? Ou será um objeto com mais detalhes (como coordenadas geográficas)?
