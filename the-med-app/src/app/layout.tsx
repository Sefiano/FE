import type { Metadata } from "next";
import "./globals.css";
import { SidebarNav } from "@/components/shared/sidebar-nav";
import { TopBar } from "@/components/shared/top-bar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "The Med — People & Places",
  description: "Decision support and simulation interface for real estate inventory management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background font-sans">
        <SidebarNav />
        <div className="pl-60 min-h-screen flex flex-col">
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
