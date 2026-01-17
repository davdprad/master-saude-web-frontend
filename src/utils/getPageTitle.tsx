import { sidebarConfig } from "@/src/config/sidebar.config";

export default function getPageTitle(pathname: string): string {
  const allRoutes = Object.values(sidebarConfig).flat();

  const match = allRoutes.find((route) => route.href === pathname);

  return match?.label ?? "Página";
}
