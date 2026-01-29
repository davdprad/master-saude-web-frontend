import { Role } from "@/src/types/role";
import LayoutWrapper from "@/src/components/layout/LayoutWrapper";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <LayoutWrapper role={Role.COMPANY}>{children}</LayoutWrapper>;
}
