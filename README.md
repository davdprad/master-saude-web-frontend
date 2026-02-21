# Master Saude Web Frontend

Frontend do portal **Master Saude**, desenvolvido com **Next.js (App Router)**, com acesso segmentado por perfil:

- `master`: gestão administrativa
- `convenio`: gestão de colaboradores vinculados a empresa/convênio
- `cliente`: visualizacao de exames proprios

## Visão Geral

A aplicação possui:

- tela inicial de selecao de perfil (`/`)
- fluxos de login separados por perfil (`/master`, `/convenio`, `/cliente`)
- áreas autenticadas por perfil com layout comum (sidebar + header)
- camada de API interna em `src/app/api/*` que atua como proxy para o backend
- autenticação baseada em cookies (`access_token`, `role`, `employee_id`, `company_id`)

## Stack Técnica

- **Framework**: Next.js `16.1.1` (App Router)
- **UI**: React `19`, Tailwind CSS `4`
- **HTTP Client**: Axios
- **Feedbacks**: Sonner (toasts)
- **Ícones**: Lucide React / React Icons
- **Linguagem**: TypeScript

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
API_URL=http://SEU_BACKEND
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=SUA_SITE_KEY_RECAPTCHA
```

- `API_URL`: URL base do backend consumido pelas rotas server-side (`src/services-server/api.ts`).
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: chave pública do Google reCAPTCHA v2 (checkbox “Não sou um robô”) usada na tela de login.
- Sem essa variavel o app falha ao iniciar (validacao em `src/config/env.ts`).

## Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

Servidor em `http://localhost:3000`.

### Build de produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Scripts

- `npm run dev`: sobe o Next em modo dev (`0.0.0.0`)
- `npm run build`: gera build de produção
- `npm run start`: inicia app em modo produção
- `npm run lint`: executa ESLint

## Rotas da Aplicação

### Publicas

- `/`: seleção de perfil
- `/master`: login master
- `/convenio`: login convenio
- `/cliente`: login cliente

### Protegidas por perfil

- **Master**
- `/master/inicio`
- `/master/colaboradores`
- `/master/colaboradores/[nid]/exames`
- `/master/empresas`
- `/master/cadastrar`
- `/master/fila`

- **Convênio**
- `/convenio/inicio`
- `/convenio/colaboradores`
- `/convenio/colaboradores/[nid]/exames`

- **Cliente**
- `/cliente/inicio`
- `/cliente/exames`

## Autenticação e Autorização

A proteção de rotas ocorre no `middleware` (`src/middleware.ts`):

- valida presença de `access_token` para rotas protegidas
- redireciona para login do perfil quando não autenticado
- valida cookie `role` para impedir acesso cruzado entre perfis

Cookies usados no fluxo:

- `access_token` (HttpOnly)
- `role` (HttpOnly)
- `employee_id` (HttpOnly)
- `company_id` (HttpOnly)
- `username` (nao HttpOnly)

## Arquitetura de API (BFF)

O frontend **não chama o backend diretamente no client** para fluxos principais. O padrão é:

1. Client chama `/api/*` local (Next Route Handler)
2. Route Handler le cookies/autenticacao
3. Route Handler encaminha para backend via `backendApi`

Rotas internas relevantes (`src/app/api`):

- `POST /api/auth/login/[role]`
- `POST /api/auth/logout`
- `POST /api/register/[role]`
- `GET /api/empresas`
- `GET /api/colaboradores`
- `GET /api/empresas/funcionarios`
- `GET /api/funcionario/[nidFuncionario]/exames`
- `GET /api/me/exames`
- `GET /api/exames/download/[nid_anexo]`

## Organizacao de Pastas

```text
src/
  app/
    (auth)/              # telas de login por perfil
    (system)/            # areas autenticadas
    api/                 # route handlers (BFF/proxy)
  components/
    cards/               # cards e dashboards
    layout/              # sidebar/header/wrapper
    tables/              # tabelas de listagem
    ui/                  # componentes base
  config/
    env.ts               # validacao de variaveis
    sidebar.config.ts    # menu por perfil
  features/
    auth/
    cadastrar/
    companies/
    employees/
    exams/
    roles/
  services/              # chamadas client -> /api
  services-server/       # chamadas server -> backend
  types/
  utils/
```

## Fluxos Principais

- **Login**: usuário autentica por perfil e recebe cookies de sessão
- **Gestao Master**: visualiza empresas, colaboradores e cadastro de usuários
- **Gestao Convenio**: lista colaboradores da própria empresa e acessa exames
- **Portal Cliente**: consulta e baixa exames próprios

## Observações

- O projeto usa Tailwind CSS v4 e estrutura modular por feature.
- A home (`/`) funciona como gateway de escolha de perfil.
