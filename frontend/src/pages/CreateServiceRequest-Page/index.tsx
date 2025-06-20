// **Importações
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// **Styles
import "./style.css";

// **Types
import { typeOptions } from "../../types/selectFilters";
import type {
  CreateServiceRequest,
  RequestStatus,
} from "../../types/serviceRequest";

// **Validação
import { createServiceSchema } from "../../validations/service/create";

// **Components
import { BackPage } from "../../components/BackPage-Component";

// **Contexto
import { useUser } from "../../contexts/User-contexto";
import { useAuth } from "../../contexts/Auth-context";
import { toast } from "react-toastify";

// **Api
import * as requestService from "../../services/request-service";

export const CreateServiceRequestPage = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateServiceRequest>({
    resolver: yupResolver(createServiceSchema),
  });

  const onSubmit: SubmitHandler<CreateServiceRequest> = async (data) => {
    try {
      if (!token || !user) return;

      toast.loading("Criando solicitação...");

      const payload: CreateServiceRequest & { status: RequestStatus } = {
        ...data,
        status: "pendente",
      };

      await requestService.createServiceRequest(token, payload);

      reset();
      navigate("/dashboard/" + user.type);

      toast.dismiss();
      toast.success("Solicitação criada com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error ao criar solicitação!");
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="create-service-request-container container">
      <BackPage />

      <div className="create-service-request-content content-center">
        <div className="create-service-request-header">
          <h2>Criar Solicitação, ;)!</h2>

          <p>Preencha os campos abaixo para criar uma nova solicitação</p>
        </div>

        <div className="create-service-request-form">
          <form
            className="create-service-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="create-service-form-inputs">
              <label className="create-service-form-label">
                <span className="create-service-form-span">Tipo:</span>
                <select
                  className="create-service-form-input"
                  {...register("type")}
                >
                  {typeOptions.map((option) => (
                    <option
                      className="create-service-form-option"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <span className="form-error">{errors.type.message}</span>
                )}
              </label>

              <label className="create-service-form-label">
                <span className="create-service-form-span">Descrição:</span>
                <input
                  type="text"
                  placeholder="Digite a descrição da solicitação"
                  className="create-service-form-input"
                  {...register("description")}
                />
                {errors.description && (
                  <span className="form-error">
                    {errors.description.message}
                  </span>
                )}
              </label>

              <label className="create-service-form-label">
                <span className="create-service-form-span">Endereço:</span>
                <input
                  type="text"
                  placeholder="Digite o endereço da solicitação"
                  className="create-service-form-input"
                  {...register("address")}
                />
                {errors.address && (
                  <span className="form-error">{errors.address.message}</span>
                )}
              </label>

              <div className="create-service-form-buttons">
                <button className="create-service-form-button">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
