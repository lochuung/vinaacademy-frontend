import { AppSidebar } from "@/components/student/profile/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar-shadcn";
import { Toaster } from "@/components/ui/toaster";
import { Toast } from "@radix-ui/react-toast";
import { Divide } from "lucide-react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex w-full bg-white border-t border-black my-[-22px] mb-[-15px]">
      <div className="flex-1 flex flex-col">
        <main className={"flex-1 p-6"}>{children}</main>
        <Toaster/>
      </div>
    </div>
  );
}
