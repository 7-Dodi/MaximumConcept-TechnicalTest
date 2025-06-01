import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const registerSchema = yup.object().shape({
  document: yup
    .string()
    .required("Campo obrigatório")
    .test("is-valid-document", "CPF ou CNPJ inválido", (value) => {
      if (!value) return false;
      const numeric = value.replace(/\D/g, "");
      return cpf.isValid(numeric) || cnpj.isValid(numeric);
    }),
  name: yup.string().required("O campo nome é obrigatório"),
  password: yup
    .string()
    .required("O campo de senha é obrigatório.")
    .min(3, "A senha deve ter pelo menos 3 caracteres."),
});
