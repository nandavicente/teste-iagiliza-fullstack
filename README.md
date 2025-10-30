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

## ��� Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### ��� Setup do Backend
```bash
# 1. Entrar na pasta backend
cd backend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Subir o PostgreSQL com Docker
docker-compose up -d

# 5. Rodar migrations do Prisma
npx prisma migrate dev

# 6. Iniciar o servidor
npm run dev
```

**Backend rodando em:** `http://localhost:3333`

### ��� Setup do Frontend
```bash
# 1. Entrar na pasta frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor
npm run dev
```

**Frontend rodando em:** `http://localhost:5173`

---

## ��� Progresso do Desenvolvimento

### ✅ Concluído (Dia 1)
- [x] Setup do projeto
- [x] Configuração do PostgreSQL (Docker)
- [x] Modelagem do banco (User, Chat, Message)
- [x] Migrations criadas

### ��� Próximos passos
- [ ] Rotas de autenticação
- [ ] Sistema de mensagens
- [ ] IA simulada
- [ ] Frontend

---

## ��� Desenvolvido por

**Fernanda Vicente**
- Portfolio: [nandavicente.github.io](https://nandavicente.github.io/)
- GitHub: [@nandavicente](https://github.com/nandavicente)

---

⭐ **Projeto desenvolvido para o processo seletivo da IAgiliza**
