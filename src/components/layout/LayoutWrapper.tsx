"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Role } from "@/src/types/role";

interface LayoutWrapperProps {
  children: React.ReactNode;
  role: Role;
}

export default function LayoutWrapper({ children, role }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        userRole={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
