import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Producciones Surhail Navarro",
  description: "Teatro y cultura en Puerto Rico. Solicitudes escolares para Scrooge.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
