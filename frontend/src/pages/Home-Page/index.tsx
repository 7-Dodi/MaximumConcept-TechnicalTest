// **Importações**
import * as React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// **Styles
import "./style.css";

// **Imagens
import city from "../../assets/city.png";

// **Validações
import { loginSchema } from "../../validations/user/login";

// **Type
import type { UserLogin, UserType } from "../../types/user";

export const HomePage = () => {
  const [typeUser, setTypeUser] = React.useState<UserType | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
  const payload = {
    ...data,
    type: typeUser as UserType || "user",
  };
  console.log(payload);
};


  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="home-page-apresentation-initial">
          <img
            src={city}
            alt="Imagem de uma cidade"
            className="apresentation-initial-image"
          />

          {!typeUser && (
            <>
              <h1 className="apresentation-initial-title">
                Bem-vindo(a) ao <span>Conceito Máximo</span>!
              </h1>
              <p className="apresentation-initial-text">
                Realize sua autenticação e comece a usar o Conceito Máximo.
              </p>

              <button
                className="apresentation-initial-button-user"
                onClick={() => setTypeUser("user")}
              >
                Entrar como usuário
              </button>

              <button
                className="apresentation-initial-button-admin"
                onClick={() => setTypeUser("admin")}
              >
                Entrar como administrador
              </button>
            </>
          )}
        </div>

        {typeUser && (
          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-login-title">
              {typeUser === "user"
                ? "Login do Usuário"
                : "Login do Administrador"}
            </h2>
            <div className="form-login-inputs">
              <label className="form-login-label">
                <span className="form-login-span">CPF ou CNPJ:</span>
                <input
                  type="text"
                  placeholder="Informe seu CPF ou CNPJ"
                  className="form-login-input"
                  {...register("document")}
                />
                {errors.document && (
                  <span className="form-error">{errors.document.message}</span>
                )}
              </label>

              <label className="form-login-label">
                <span className="form-login-span">Senha:</span>
                <input
                  type="password"
                  placeholder="Senha"
                  className="form-login-input"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </label>
            </div>

            <div className="form-login-buttons">
              <button type="submit" className="form-login-button">
                Entrar
              </button>
              <button
                type="button"
                className="form-login-button-back"
                onClick={() => setTypeUser(undefined)}
              >
                Voltar
              </button>
            </div>  

            <p className="form-login-text">
              {typeUser === "user" ? (
                <>
                  Não tem uma conta? <a href="/register/user">Crie uma agora!</a>
                </>
              ) : (
                <>
                  Não tem uma conta de administrador?{" "}
                  <a href="/register/admin">Crie uma agora!</a>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
