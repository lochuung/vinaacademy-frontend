import { AppSidebar } from "@/components/student/profile/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar-shadcn";
import { Divide } from "lucide-react";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <SidebarProvider>
                <main className="relative flex z-20 bg-gray-50 -top-8 w-full">
                    <div className="fixed left-0 top-0 w-64 z-10">
                        <div className="w-full h-48 z-10" />
                        <AppSidebar className=" translate-y-28 h-[57vh] z-10" />

                    </div>

                    {/* Main Content with higher z-index and scroll behavior */}
                    <div className="flex-1 ml-64 pb-8 pt-2 px-11 relative z-20 bg-gray-100 max-h-screen w-full">
                        <div className="z-20">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
    )
}