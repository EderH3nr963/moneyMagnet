# Money Magnet — Frontend

Interface web do Money Magnet para acompanhamento financeiro e integração com instituições bancárias. O projeto consome a API Spring Boot do backend e oferece autenticação, dashboard, transações, categorias, regras automáticas por merchant e conexão bancária pela Pluggy.

## Tecnologias

- Next.js 16 e React 19
- TypeScript 5
- Tailwind CSS 4
- Chart.js e react-chartjs-2
- Lucide React
- Pluggy Connect

## Pré-requisitos

- Node.js compatível com Next.js 16
- NPM
- Backend do Money Magnet disponível, por padrão, em `http://localhost:8080`

## Configuração

Crie o arquivo local de ambiente a partir do exemplo:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Essa URL precisa apontar para o backend. Em desenvolvimento, o frontend roda em `http://localhost:3000`.

## Execução

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Outros comandos:

```bash
npm run lint
npm run build
npm run start
```

## Autenticação

O fluxo atual usa dois tokens:

- **Access token JWT:** válido por 1 hora e armazenado no `localStorage`.
- **Refresh token:** válido por 30 dias e armazenado pelo navegador em cookie `HttpOnly`.

O frontend nunca lê diretamente o refresh token. Todas as chamadas usam `credentials: "include"`, permitindo que o navegador envie o cookie automaticamente para os endpoints de autenticação.

Antes de uma chamada protegida, o cliente verifica a expiração registrada do access token. Quando ele está expirado ou próximo de expirar, chama `POST /api/v1/auth/refresh`, salva o novo access token e continua a requisição. Se uma chamada retornar `401`, o cliente tenta renovar a sessão uma vez e repete a chamada original.

Renovações simultâneas compartilham a mesma Promise, evitando que várias requisições tentem consumir o mesmo refresh token ao mesmo tempo.

No logout, o frontend chama `POST /api/v1/auth/logout` e depois remove access token, usuário e preferências de sessão do armazenamento local.

## Cliente da API

O cliente foi modularizado em `lib/api/`:

```text
lib/
├── api.ts                  # ponto público de reexportação
└── api/
    ├── auth.ts             # login, cadastro, logout e recuperação de senha
    ├── categories.ts       # categorias e regras por merchant
    ├── client.ts           # fetch, Bearer token, retry e respostas
    ├── config.ts           # URL do backend
    ├── dashboard.ts        # resumo e histórico financeiro
    ├── error.ts            # ApiError
    ├── institutions.ts     # bancos, itens e Pluggy
    ├── profile.ts          # perfil, senha e tema
    ├── session.ts          # localStorage e renovação da sessão
    └── transactions.ts     # transações e filtros
```

Os componentes e hooks podem continuar importando pelo ponto central:

```ts
import { getDashboard, ApiError } from "@/lib/api";
```

## Páginas principais

- `/auth/login`: login
- `/auth/register`: cadastro
- `/auth/forgot-password`: solicitação de recuperação de senha
- `/reset-password`: redefinição de senha
- `/dashboard`: resumo financeiro e gráficos
- `/transactions`: histórico de transações
- `/categories`: categorias personalizadas
- `/banks`: instituições conectadas
- `/banks/[itemId]`: contas e transações da conexão
- `/settings`: perfil, senha, tema, regras por merchant e exclusão da conta

## Funcionalidades

- Cadastro e login com renovação automática de sessão
- Recuperação de senha por e-mail
- Dashboard com saldo, receitas, despesas e histórico mensal
- Conexão bancária via Pluggy Connect
- Listagem de instituições e contas
- Sincronização e consulta de transações
- Filtro de transações por período
- Alteração da categoria de uma transação
- CRUD de categorias personalizadas
- Regras automáticas de categoria por merchant
- Preferência de tema claro ou escuro
- Atualização e exclusão de perfil

## Validação

Antes de entregar alterações:

```bash
npm run lint
npm run build
```

Também é possível validar somente os tipos:

```bash
npx tsc --noEmit
```

## Observações de segurança

- O refresh token não é retornado no JSON nem fica disponível ao JavaScript.
- O access token é enviado no cabeçalho `Authorization: Bearer <token>`.
- O frontend apenas verifica a expiração para decidir quando renovar; assinatura, usuário e versão da sessão são sempre validados pelo backend.
- Redirecionamentos e verificações visuais do frontend não substituem a autorização dos endpoints do backend.
