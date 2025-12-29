import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Master Saúde",
  description: "Master Sáude",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
