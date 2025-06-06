
# **Máximo Conceito - Teste Técnico**

Este projeto condiz com a organização dos códigos em um repositório para um Teste Técnico realizado para a vaga de Desenvolvedor Fullstack. Para tanto, o projeto corresponde a um sistema simples para cadastro e gerenciamento de solicitações de serviços urbanos, tais como:

* Troca de lâmpadas em postes de luz
* Solicitação de tapa-buraco em vias públicas


## **📁 Estrutura do Projeto**
Este repositório é subdividido em dois diretórios, um destinado para o frontend e outro para o backend.

```bash
MaximumConcept-TechnicalTest/
├── backend/   # API desenvolvida com NestJS
└── frontend/  # Aplicação web desenvolvida com React
```

## **🚀 Tecnologias Utilizadas**
### Frontend:
* React
* Typescript
* Axios
* React Toastify

### Backend:
* NestJS
* Typescript
* TypeORM
* PostgreSQL
* Docker-compose

## **⚙️ Pré-requisitos**
Certifique-se de ter instalado em sua máquina:
* Node.js (Versão 18 ou superior)
* Npm ou Yarn
* Docker

## **🛠️ Instalação**

1. **Clone o repositório:**
```bash
git clone https://github.com/7-Dodi/MaximumConcept-TechnicalTest.git
cd MaximumConcept-TechnicalTest
```

2. **Configuração do Backend:**
```bash
cd backend
npm install
```
Crie um arquivo .env na raiz do diretório backend com as variáveis presentes no .env.exemple, ou no exemplo abaixo:
```bash
JWT_SECRET=
JWT_EXPIRATION_TIME=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

3. **Configuração do Frontend:**
```bash
cd frontend
npm install
```

## **▶️ Execução**
1. **Backend:**
Execute, incialmente, na raiz do projeto, o docker-compose:
```bash
cd backend
docker-compose up -d
```
Após a execurção do docker, inicie o servidor:
```bash
npm run start:dev
```
A API estará disponível em http://localhost:3000.


2. **Frontend:**
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em http://localhost:5173.

## **✅ Considerações Finais**
Este projeto foi desenvolvido com o objetivo de demonstrar habilidades técnicas em uma stack moderna de desenvolvimento web, abrangendo tanto o frontend quanto o backend. O sistema permite o cadastro, visualização e atualização de solicitações de serviços urbanos de forma simples e intuitiva, respeitando boas práticas de desenvolvimento como:

* Separação de responsabilidades entre cliente e servidor;

* Utilização de um banco de dados relacional com persistência de dados via ORM;

* Componentização no frontend com React;

* Comunicação entre as camadas via API REST.

Caso queira testar a aplicação localmente, siga os passos de instalação e execução descritos acima. Feedbacks e sugestões são bem-vindos!