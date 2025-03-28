import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Footer from '@/components/layout/Footer';

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
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        {/* Script để khắc phục vấn đề điều hướng */}
        <script dangerouslySetInnerHTML={{
          __html: `
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
          `
        }} />
      </body>
    </html>
  );
}