export type RoleLoginConfig = {
  role: "master" | "cliente" | "convenio";
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

export type AuthSession = {
  role: Role;
  company_id: number | null;
  employee_id: number | null;
};

export type LoginPayload = {
  login: string;
  senha: string;
};

export type Role = "master" | "convenio" | "cliente";
