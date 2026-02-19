### Money Magnet(Front End)

Aplicação web para gestão financeira de Microempreendedores (ME), com dashboard interativo, categorias personalizáveis e importação de planilhas .xlsx.

O objetivo do projeto é oferecer uma ferramenta simples e eficiente para controle de receitas, despesas e visualização estratégica de dados financeiros.

## Tecnologias Usadas

- React
- TypeScript
- Recharts
- Axios
- TailwindCSS
- Integração com API Spring Boot
- Importação de planilhas .xlsx

## Funcionalidades

Funcionalidades

✅ Dashboard financeiro com gráficos dinâmicos
✅ Cadastro de receitas e despesas
✅ Categorias personalizáveis
✅ Sumário mensal(mês atual)
✅ Autenticação com JWT
✅ Integração com API REST
✅ Importação de planilhas .xlsx
🔜 Exportação de relatórios (planejado)

## Arquitetura do Projeto

```bash
src/
│
├── api/ # Integração com backend
├── components/ # Componentes reutilizáveis
├── hooks/ # Hooks customizados
├── pages/ # Páginas da aplicação
├── contexts/ # Context API (Auth)
├── utils/ # Funções auxiliares
└── types/ # Tipagens globais
```

## Pré Requisitos

Node.js 18+
npm ou yarn
Backend da API rodando

## Instalação

Clone o repositório:

```bash
git clone https://github.com/EderH3nr963/moneyMagnet.git
```

Entre na pasta:

```
cd moneyMagnet
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo .env:

```bash
VITE_API_URL=https://sua-api.onrender.com
```

Inicie o projeto:

```bash
npm run dev
```

## Integração com Back-End

- O frontend consome a API desenvolvida em Spring Boot, responsável por:
- Autenticação JWT
- CRUD de transações
- Dashboard financeiro
- Categorias
- Relatórios

## Deploy

Frontend hospedado na Vercel
Backend hospedado no Render
