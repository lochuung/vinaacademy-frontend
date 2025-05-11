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
            <main className="ml-[-50px] max-w-screen mt-[-20px]">
                {children}
                <Toaster/>
            </main>
    )
}