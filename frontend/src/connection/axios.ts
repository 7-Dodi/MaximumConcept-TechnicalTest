// Importações
import axios from "axios";

// Configurações
export const portApi = "http://localhost:3000/";

export const apiMC = axios.create({
  baseURL: portApi,
});
