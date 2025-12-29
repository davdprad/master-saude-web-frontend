import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";
import { Role } from "@/src/types/role";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar role={Role.USER} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
