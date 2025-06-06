//  Definind tipo de options
export type optionType = {
    label: string;
    value: string;
};

// Definindo tipo de filtros
export const statusOptions: optionType[] = [
    { label: "Status", value: "" },
    { label: "Pendente", value: "pendente" },
    { label: "Em andamento", value: "em_andamento" },
    { label: "Concluído", value: "concluido" },
];

export const typeOptions: optionType[] = [
    { label: "Tipo", value: "" },
    { label: "Troca de lâmpada", value: "troca_lampada" },
    { label: "Tapa buraco", value: "tapa_buraco" },
];

export const dateOptions: optionType[] = [
    { label: "Data", value: "" },
    { label: "Hoje", value: "hoje" },
    { label: "Ontem", value: "ontem" },
    { label: "Semana passada", value: "semana_passada" },
    { label: "Mês passado", value: "mes_passado" },
    { label: "Ano passado", value: "ano_passado" },
];
