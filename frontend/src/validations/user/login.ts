import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const loginSchema = yup.object().shape({
  document: yup
    .string()
    .required("Campo obrigatório")
    .test("is-valid-document", "CPF ou CNPJ inválido", (value) => {
      if (!value) return false;
      const numeric = value.replace(/\D/g, "");
      return cpf.isValid(numeric) || cnpj.isValid(numeric);
    }),
  password: yup
    .string()
    .required("O campo de senha é obrigatório.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});
