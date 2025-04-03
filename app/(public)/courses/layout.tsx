import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/student/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="mt-[134px]">
        {children}

      </main>

  );
}