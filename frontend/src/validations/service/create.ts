import * as yup from "yup";
import type { RequestType } from "../../types/serviceRequest";

export const createServiceSchema = yup.object().shape({
  description: yup
    .string()
    .required("O campo de descrição é obrigatório.")
    .min(3, "A descrição deve ter pelo menos 3 caracteres."),
  address: yup
    .string()
    .required("O campo de endereço é obrigatório.")
    .min(3, "O endereço deve ter pelo menos 3 caracteres."),
  type: yup
    .mixed<RequestType>()
    .required("O campo de tipo é obrigatório.")
    .oneOf(["tapa_buraco", "troca_lampada"], "Tipo inválido."),
});
