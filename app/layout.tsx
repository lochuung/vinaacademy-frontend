import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Script from 'next/script';
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from '@/context/CategoryContext';
import { CartProvider } from '@/context/CartContext'; // Thêm import này
import { Toaster } from "@/components/ui/sonner";
import ToastProvider from '@/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ViNA ACADEMY - Nền tảng học trực tuyến',
  description: 'Học mọi lúc, mọi nơi với ViNA ACADEMY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <CategoryProvider>
              <CartProvider> {/* Thêm CartProvider bao quanh LayoutWrapper */}
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
                <Toaster />{/* Hiển thị Toaster */}
              </CartProvider>
            </CategoryProvider>
          </AuthProvider>
        </ToastProvider>

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