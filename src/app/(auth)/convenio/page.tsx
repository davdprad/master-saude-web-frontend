import LoginTemplate from "@/src/features/auth/components/LoginTemplate";
import { RoleLoginConfig } from "@/src/types/auth";
import LogoMaster from "@/public/logo-master.svg";
import LogoMasterWhite from "@/public/logo-master-white.svg";

const config: RoleLoginConfig = {
  role: "convenio",
  apiEndpoint: "/auth/convenio/login",
  redirectTo: "/convenio/inicio",
  title: "Entrar",
  subtitle: "Use seu login e senha para acessar",
  logos: { dark: LogoMaster, white: LogoMasterWhite },
  left: {
    productName: "Portal Master Saúde",
    tagline: "Acesso convênio",
    welcomeTitle: "Olá, seja muito bem-vindo(a)!",
    welcomeText:
      "Entre com suas credenciais para gerenciar colaboradores e exames.",
    icon: "handshake",
  },
};

export default function Page() {
  return <LoginTemplate config={config} />;
}
