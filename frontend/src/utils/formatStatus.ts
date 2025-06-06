import type { RequestStatus } from "../types/serviceRequest";

//Definindo função de formatação de status
export const formatStatus = (status: RequestStatus): string => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "em_andamento":
      return "Em Andamento";
    case "concluido":
      return "Concluído";
    default:
      return (
        (status as string).charAt(0).toUpperCase() + (status as string).slice(1)
      );
  }
};
