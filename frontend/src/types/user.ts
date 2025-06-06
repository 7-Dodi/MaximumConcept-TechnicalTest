// Definindo o tipo de documento (CPF ou CNPJ)
export type DocumentType = "cpf" | "cnpj";

//Definindo o tipo de usuário
export type UserType = "user" | "admin";

// Definindo a interface para o usuário
export interface User {
  id: string;
  name: string;
  document: string; // CPF ou CNPJ
  documentType: DocumentType; // "cpf" ou "cnpj"
  password: string;
  type: UserType; // "user" ou "admin"
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLogin {
  document: string; // CPF ou CNPJ
  password: string;
}

export type creteUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export type returnUser = Omit<User, "password" | "document" | "documentType">;