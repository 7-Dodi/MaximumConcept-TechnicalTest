// **Importações
import type { RequestType } from "../types/serviceRequest";

// **Utils
export const formatTypeService = (type: RequestType) => {
    switch (type) {
        case "tapa_buraco":
            return "Tapa Buraco";
        case "troca_lampada":
            return "Troca Lâmpada";
        default:
            return "Tipo Desconhecido";
    }
};