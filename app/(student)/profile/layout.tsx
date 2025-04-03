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

    <SidebarProvider className="">

      <main className="">
        <div className="flex ml-[11vh]">
          <AppSidebar className="pt-40" />

          <div className="flex-1  py-8 mt-28 px-4">
            {children}
          </div>
        </div>

      </main>
    </SidebarProvider>

  );
}