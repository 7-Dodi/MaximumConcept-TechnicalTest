import type { optionType } from "../types/selectFilters";

export const getNextStatuses = (currentStatus: string): optionType[] => {
  switch (currentStatus) {
    case "pendente":
      return [
        { label: "Pendente", value: "pendente" },
        { label: "Em andamento", value: "em_andamento" },
        { label: "Concluído", value: "concluido" },
      ];
    case "em_andamento":
      return [
        { label: "Em andamento", value: "em_andamento" },
        { label: "Concluído", value: "concluido" },
      ];
    case "concluido":
      return [{ label: "Concluído", value: "concluido" }];
    default:
      return [];
  }
};
