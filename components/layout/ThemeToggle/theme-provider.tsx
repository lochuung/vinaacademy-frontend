'use client'; // Chỉ định rằng file này sẽ được render phía client

import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps
} from 'next-themes'; // Import ThemeProvider và ThemeProviderProps từ thư viện next-themes

// Định nghĩa component ThemeProvider
export default function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>; // Sử dụng NextThemesProvider để bọc các component con
}