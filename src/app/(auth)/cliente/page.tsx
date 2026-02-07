import LoginTemplate from "@/src/features/auth/components/LoginTemplate";
import { RoleLoginConfig } from "@/src/types/auth";
import LogoMaster from "@/public/logo-master.svg";
import LogoMasterWhite from "@/public/logo-master-white.svg";

const config: RoleLoginConfig = {
  role: "cliente",
  redirectTo: "/cliente/inicio",
  title: "Entrar",
  subtitle: "Use seu login e senha para acessar",
  logos: { dark: LogoMaster, white: LogoMasterWhite },
  left: {
    productName: "Portal Master Saúde",
    tagline: "Acesso cliente",
    welcomeTitle: "Olá, seja muito bem-vindo(a)!",
    welcomeText: "Entre com suas credenciais para visualizar seus exames.",
    icon: "user",
  },
};

export default function Page() {
  return <LoginTemplate config={config} />;
}
