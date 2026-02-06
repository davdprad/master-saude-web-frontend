export type RoleLoginConfig = {
  role: "master" | "cliente" | "convenio";
  apiEndpoint: string; // ex: "/api/auth/master/login"
  redirectTo: string; // ex: "/master"
  title: string; // "Entrar"
  subtitle: string; // "Use seu login e senha para acessar"
  left: {
    productName: string; // "Portal Master Saúde"
    tagline: string; // "Acesso administrativo"
    welcomeTitle: string; // "Olá, seja muito bem-vindo(a)!"
    welcomeText: string; // texto grande
    icon: "crown" | "user" | "handshake"; // Crown, etc
  };
  logos: {
    dark: any; // StaticImport
    white: any; // StaticImport
  };
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  refresh_expires_at: number; // unix timestamp (segundos)
  refresh_id: number;
  token_type: "bearer";
  role: "master" | "cliente" | "convenio" | string;
  company_id: number | null;
  employee_id: number | null;
};

export type LoginPayload = {
  login: string;
  senha: string;
};
