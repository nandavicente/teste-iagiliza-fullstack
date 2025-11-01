# Teste Técnico — Desenvolvedor(a) Fullstack

Bem-vindo(a)!
Este teste avalia sua capacidade de desenvolver uma aplicação Fullstack com TypeScript.

---

## Stack requisitada

### Backend
- Fastify
- Prisma ORM
- Zod
- TypeScript
- Banco: PostgreSQL

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- Axios
- Zod

---

## Desafio: Chat simples com IA simulada

Você deve criar um pequeno chat entre o usuário e uma IA simulada.
A IA não precisa ser real, o backend pode retornar respostas simples ou aleatórias.

O usuário precisa:
1. Cadastrar-se e fazer login
2. Ter sua sessão armazenada localmente para manter o login
3. Enviar e visualizar mensagens da conversa
4. Receber respostas da IA simulada
4. Editar seus dados (nome, email)

---

## Funcionalidades obrigatórias

### Backend
- Rotas:
  - POST /register — cria novo usuário
  - POST /login — autentica usuário
  - GET /me — retorna dados do usuário logado
  - PATCH /me — atualiza nome/email do usuário
  - GET /messages — retorna histórico do usuário logado
  - POST /message — envia nova mensagem e retorna resposta da IA
- Validação de entrada e saída com Zod
- ORM com Prisma
- Persistência em PostgreSQL
- Autenticação com JWT simples
- Tipagem completa em TypeScript

A IA pode responder com algo simples, por exemplo:

- "Interessante! Conte mais.",
- "Não tenho certeza, mas parece legal!",
- "Hmm, e se tentássemos outra abordagem?",
- "Entendi parcialmente. Você pode explicar melhor?"

---

### Frontend
- Páginas:
  - Login / Cadastro
  - Chat (lista mensagens + campo de envio)
  - Perfil (edição de nome/email)
- Estilização com TailwindCSS
- Requisições via Axios
- Validação de formulários com Zod
- Armazenar informações da sessão (Cookies ou LocalStorage)
- Mostrar mensagens do usuário e da IA

---

## O que será avaliado

| Critério | Peso (1-10)|
|-----------|------|
| Boas práticas (nomes, pastas, commits) | 4 |
| Organização do código | 6 |
| Validação e tratamento de erros | 7 |
| Uso correto do TypeScript e do Prisma | 8 |
| Funcionalidade completa (chat, login, perfil) | 9 |
| Layout funcional com Tailwind | 10 |
| Explicação do projeto e funcionalidades | 10 |

### Desafios Bônus

| Critério | Peso (1-5)|
|-----------|------|
| Escrita do código em inglês | 1 |
| Implementar tema claro e escuro | 1 |
| Utilizar componentes ShadcnUI | 2 |
| Landing page apresentando o "produto" | 3 |
| Se comunicar via API com alguma LLM | 4 |
| Permitir que um usuário possua vários chats | 5 |

---

## Dicas

- Prefira componentes pequenos e reutilizáveis
- Tipagem é importante, mas clareza vem primeiro

---

## Entrega

- A entrega do projeto deve ser feita em até 7 dias após o recebimento do link desse repositório
- Faça um fork público desse repositório
- Adicione seu código à medida em que desenvolve
- Inclua:
  - Este README atualizado com instruções reais de execução do seu projeto
  - Todo o código fonte do seu projeto

---

## **Boa sorte, estamos ansiosos para te receber no time IAgiliza!**

---

##  Como Executar o Projeto (Instruções de Setup)

> **Nota:** Esta seção foi adicionada como parte da entrega do teste.

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/nandavicente/teste-iagiliza-fullstack.git
cd teste-iagiliza-fullstack
```

### 2️⃣ Setup do Backend
```bash
cd backend

# Instalar dependências
npm install

# Subir PostgreSQL com Docker
docker-compose up -d

# Aguardar 10 segundos para o banco inicializar
sleep 10

# Rodar migrations
npx prisma migrate dev

# Iniciar servidor
npm run dev
```
✅ **Backend rodando em:** `http://localhost:3333`

### 3️⃣ Setup do Frontend (novo terminal)
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar aplicação
npm run dev
```
✅ **Frontend rodando em:** `http://localhost:5173`

### 4️⃣ Acessar a Aplicação
Abra o navegador em: **http://localhost:5173**

---

##  Testando a Aplicação

### Fluxo Completo de Teste

1. **Criar Conta** 
- Acesse http://localhost:5173/auth 
- Clique em "Não tem conta? Cadastre-se" 
- Preencha nome, e-mail e senha 
- Clique em "Criar conta"

2. **Enviar Mensagens** 
- Digite uma mensagem no chat 
- Pressione Enter ou clique em  
- IA responde automaticamente

3. **Bate-papos múltiplos** 
- Clique em "+ Novo Chat" 
- Iniciar nova conversa

4. **Editar perfil** 
- Clique no seu nome (canto superior direito) 
- Clique em " Editar perfil" 
- Altere seu nome 
- Clique em " Salvar alterações"

5. **Sair** 
- Clique em "Sair" 
- Tente acessar /chat (será redirecionado para login)

6. **Login Novamente** 
- Entre com suas credenciais 
- Histórico de mensagens persiste!

Veja evidências visíveis em: **[TESTING.md](TESTING.md)**

---


## 📁 Estrutura do Projeto
```
teste-iagiliza-fullstack/
├── backend/                    # API Node.js
│   ├── prisma/
│   │   ├── migrations/        # Histórico do banco
│   │   └── schema.prisma      # Modelo de dados
│   ├── src/
│   │   ├── config/           # Configurações
│   │   │   └── database.ts
│   │   ├── controllers/      # Handlers de requisições
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   └── message.controller.ts
│   │   ├── middlewares/      # Middleware de auth
│   │   │   └── auth.middleware.ts
│   │   ├── routes/           # Definição de rotas
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   └── message.routes.ts
│   │   ├── schemas/          # Validação Zod
│   │   │   ├── auth.schema.ts
│   │   │   └── message.schema.ts
│   │   ├── services/         # Lógica de negócio
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── message.service.ts
│   │   ├── utils/            # Utilitários
│   │   │   ├── ai.util.ts
│   │   │   ├── jwt.util.ts
│   │   │   └── password.util.ts
│   │   └── server.ts         # Entry point
│   ├── .env                  # Variáveis de ambiente
│   ├── docker-compose.yml    # PostgreSQL setup
│   └── package.json
│
├── frontend/                  # App React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/         # Estado global
│   │   │   └── AuthContext.tsx
│   │   ├── pages/            # Páginas
│   │   │   ├── AuthPage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── services/         # Integração API
│   │   │   └── api.ts
│   │   ├── types/            # Tipos TypeScript
│   │   │   └── index.ts
│   │   ├── App.tsx           # Router principal
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Estilos globais
│   ├── tailwind.config.js    # Config Tailwind
│   ├── vite.config.ts        # Config Vite
│   └── package.json
│
├── docs/                     # Documentação
│   ├── screenshots/          # Prints da aplicação
│   └── API-TESTS.md          # Testes da API
├── TESTING.md                # Relatório de testes
└── README.md                 # Este arquivo
```

---

##  Arquitetura e Padrões

### Backend
- **MVC Pattern** - Separação Model/View/Controller
- **Service Layer** - Lógica de negócio isolada
- **Repository Pattern** - Acesso a dados via Prisma
- **Middleware Chain** - Autenticação JWT
- **Dependency Injection** - Facilita testes

### Frontend
- **Context API** - Gerenciamento de estado global
- **HOC Pattern** - Protected routes
- **Service Layer** - Abstração de API calls
- **Observer Pattern** - useEffect para side effects
- **Controlled Components** - Forms com React state

### Estruturas de Dados
- **Arrays** - Listas de mensagens (O(1) append)
- **Hash Maps** - LocalStorage (O(1) access)
- **Objects** - Entidades User/Chat/Message
- **Trees** - Hierarquia de componentes React

---

## 🎓 Conceitos de Ciência da Computação

### Algoritmos & Complexidade
- Token validation (algoritmo JWT)
- Password hashing (bcrypt)
- Auto-scroll optimization
- Efficient data fetching

### Paradigmas de Programação
- **Funcional** - React hooks, funções puras
- **OOP** - Classes Prisma, encapsulamento
- **Declarativo** - React JSX, SQL queries
- **Event-Driven** - Interações do usuário

### Engenharia de Software
- Clean Architecture
- SOLID Principles
- DRY (Don't Repeat Yourself)
- Separation of Concerns
- RESTful API design

---

## 📅 Cronograma de Desenvolvimento

### 📆 Dia 1 (29/10/2025) - Setup e Backend


- ✅ Fork do repositório
- ✅ Setup do projeto (backend + frontend)
- ✅ Configuração PostgreSQL (Docker)
- ✅ Modelagem do banco de dados (Prisma)
- ✅ Migrations criadas
- ✅ Schemas de validação (Zod)
- ✅ Utilitários (JWT, Password, AI)
- ✅ Services (Auth, User, Message)
- ✅ Controllers completos
- ✅ Middleware de autenticação
- ✅ Rotas configuradas
- ✅ Servidor Fastify funcionando

**Resultado:** Backend 100% funcional e testado ✅

---

### 📆 Dia 2 (30/10/2025) - Frontend e Integração



- ✅ Testes da API (Postman/cURL)
- ✅ Setup do frontend (React + Vite + TypeScript)
- ✅ Configuração TailwindCSS
- ✅ Tipos TypeScript
- ✅ Service de API (Axios)
- ✅ Context de autenticação
- ✅ Páginas (Auth, Chat, Profile)
- ✅ Protected Routes (HOC)
- ✅ Routing (React Router)
- ✅ Integração completa
- ✅ Testes end-to-end
- ✅ UI/UX polimento

**Resultado:** Aplicação fullstack completa e funcional ✅

---

### 📆 Dia 3 (01/11/2025) - Arremate e Revisão


**Planejado:**
-  Revisão de código
-  Screenshots para documentação
-  Documentação completa
-  Correção de cores 
-  Melhorias finais de UI/UX
-  Testes de edge cases
-  Checklist de entrega

---

##  Desenvolvido por

**Maria Fernanda de Oliveira Vicente**

-  Portfolio: [nandavicente.github.io](https://nandavicente.github.io)
-  GitHub: [@nandavicente](https://github.com/nandavicente)
-  Email: mafevicente@gmail.com

---

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo da IAgiliza.

---

##  Agradecimentos

Agradeço à equipe IAgiliza pela oportunidade de participar deste processo seletivo. ---

<div align="center">


---

 **Projeto desenvolvido para o processo seletivo da IAgiliza**