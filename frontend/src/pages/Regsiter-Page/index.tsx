// **Importações
import * as React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// **Styles
import "./style.css";

// **Imagens
import city from "../../assets/city.png";

// **Validações
import { registerSchema } from "../../validations/user/create";

// **Type
import type { DocumentType, UserType } from "../../types/user";

type RegisterForm = {
  name: string;
  document: string;
  password: string;
};

export const RegisterPage = () => {
  const [typeDocument, setTypeDocument] = React.useState<DocumentType>("cpf");
  const { type } = useParams<{ type: UserType }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    try{
        const payload = {
      ...data,
      type: (type as UserType) || "user",
      documentType: typeDocument,
    };
    console.log(payload);

    reset();
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const documentValue = watch("document");

  React.useEffect(() => {
    const digitsOnly = documentValue?.replace(/\D/g, "");
    if (digitsOnly?.length > 11) {
      setTypeDocument("cnpj");
    } else {
      setTypeDocument("cpf");
    }
  }, [documentValue]);

  return (
    <div className="register-page-container container">
      <div className="register-page-content content-center">
        <img
          src={city}
          alt="Imagem de uma cidade"
          className="apresentation-initial-image"
        />

        <h1 className="register-page-title">
          Seja bem-vindo(a), <span>=)</span> !
        </h1>
        <p className="register-page-text">
          Por favor, preencha o formulário abaixo para se registrar.
        </p>

        <p className="register-page-text">
          Ao concluir o registro, você possuirá acessor de:{" "}
          <span>{type === "user" ? "Usuário" : "Administrador"}</span>.
        </p>

        <form className="register-page-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="register-page-form-inputs">
            <label className="register-page-form-label">
              <span className="register-page-form-span">Nome:</span>
              <input
                type="text"
                className="register-page-form-input"
                placeholder="Digite seu nome"
                required
                {...register("name")}
              />
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </label>

            <label className="register-page-form-label">
              <span className="register-page-form-span">CPF ou CNPJ:</span>
              <input
                type="text"
                className="register-page-form-input"
                placeholder="Digite seu CPF ou CNPJ"
                required
                {...register("document")}
              />
              {errors.document && (
                <span className="form-error">{errors.document.message}</span>
              )}
            </label>

            <label className="register-page-form-label">
              <span className="register-page-form-span">Senha:</span>
              <input
                type="password"
                className="register-page-form-input"
                placeholder="Digite sua senha"
                required
                {...register("password")}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </label>

            <div className="register-page-buttons">
              <button className="register-page-button">Registrar</button>
              <button className="register-page-button-cancel" onClick={() => navigate("/")}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
