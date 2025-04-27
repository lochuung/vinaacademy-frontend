import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Script from 'next/script';
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from '@/context/CategoryContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from "@/components/ui/sonner";
import ToastProvider from '@/providers/ToastProvider';
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VinaAcademy - Nền tảng học trực tuyến',
  description: 'Học mọi lúc, mọi nơi với VinaAcademy',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToastProvider>
            <AuthProvider>
              <CategoryProvider>
                <CartProvider>
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
                  <Toaster />
                  <ToastContainer />
                </CartProvider>
              </CategoryProvider>
            </AuthProvider>
          </ToastProvider>
        </ReactQueryProvider>

        {/* Use Next.js Script component for client-side scripts */}
        <Script id="navigation-fix">
          {`
            // Xử lý việc quay về trang chủ từ Logo
            document.addEventListener('DOMContentLoaded', function() {
              const logo = document.querySelector('a.text-2xl.font-bold');
              if (logo) {
                logo.addEventListener('click', function(e) {
                  if (window.location.pathname.includes('/search')) {
                    e.preventDefault();
                    window.location.href = '/';
                  }
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}