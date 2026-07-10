# Money Magnet Frontend

Interface web do Money Magnet, criada com Next.js, React, TypeScript e Tailwind CSS. O front consome a API Spring Boot do backend para autenticação, dashboard financeiro, instituições, contas, transações, categorias, regras por merchant e preferências do usuário.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Chart.js e react-chartjs-2
- Pluggy Connect no fluxo de conexão bancária

## Pré-requisitos

- Node.js compatível com Next.js 16
- Backend rodando em `http://localhost:8080`
- NPM instalado

## Configuração

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Variável disponível:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Se o backend estiver em outra porta ou URL, altere `NEXT_PUBLIC_API_URL`.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie em desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Rotas principais

- `/auth/login`: login
- `/auth/register`: cadastro
- `/auth/forgot-password`: solicitação de recuperação de senha
- `/reset-password`: redefinição de senha por token
- `/dashboard`: resumo financeiro
- `/transactions`: histórico de transações
- `/categories`: categorias do sistema e categorias do usuário
- `/institutions`: instituições conectadas
- `/institutions/[institutionId]`: detalhes da instituição
- `/settings`: perfil, segurança, aparência e regras por merchant

## Fluxos implementados

- Autenticação com JWT salvo em `localStorage`
- Cadastro com login automático após sucesso
- Recuperação e redefinição de senha
- Dashboard com resumo, histórico financeiro, gráficos e ações rápidas
- Integração Pluggy Connect para conectar instituições
- Listagem de contas e instituições
- Histórico de transações com filtro por período
- Alteração de categoria da transação
- Criação de regra automática por merchant
- CRUD de categorias personalizadas
- Preferência de tema claro/escuro
- Configurações de perfil, senha e exclusão de conta

## Integração com a API

As chamadas ficam centralizadas em:

```text
lib/api.ts
```

O backend deve expor os endpoints em:

```text
http://localhost:8080
```

Swagger do backend:

```text
http://localhost:8080/swagger-ui.html
```

## Validação

Para validar o front:

```bash
npm run lint
npm run build
```

Observação: se o ambiente local tiver o comando `npm` com problema, é possível rodar diretamente:

```bash
node .\node_modules\eslint\bin\eslint.js .
node .\node_modules\next\dist\bin\next build
```
