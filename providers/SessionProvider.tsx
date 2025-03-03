'use client';

import { SessionProvider } from 'next-auth/react';

/*
  Component AuthProvider:
  - Bọc nội dung children với SessionProvider của next-auth,
  - Cung cấp context xác thực (authentication) cho các component con.
*/
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
