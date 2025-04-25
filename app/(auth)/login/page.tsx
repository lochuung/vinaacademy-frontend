'use client';

import LoginForm, { LoginFormValues } from '@/components/ui/loginform';
import React, { useEffect, useState, Suspense } from "react";
import { LoginCredentials } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

// Loading component for Suspense fallback
function LoginLoading() {
    return (
        <main className='flex items-center justify-center max-h-full bg-gradient-to-tl from-gray-300 via-gray-200 to-neutral-300'>
            <div className='w-full max-w-[28%] p-8 bg-white rounded-lg shadow-lg'>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">VN Academy</h1>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </main>
    );
}

// Component that uses useSearchParams
function LoginContent() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectToTarget = React.useCallback(() => {
        const redirectUrl = searchParams.get('redirect');
        router.push(redirectUrl || document.referrer || '/');
    }, [router, searchParams]);

    useEffect(() => {
        if (isAuthenticated) {
            redirectToTarget();
        }
    }, [isAuthenticated, redirectToTarget]);

    const handleSubmit = async (data: LoginFormValues) => {
        setError(null);
        setIsLoading(true);

        try {
            const credentials: LoginCredentials = {
                email: data.email,
                password: data.password
            };

            const success = await login(credentials);

            if (success) {
                redirectToTarget();
            } else {
                setError('Email hoặc mật khẩu không đúng');
            }
        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi trong quá trình đăng nhập');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className='flex items-center justify-center max-h-full bg-gradient-to-tl from-gray-300 via-gray-200 to-neutral-300'>

            <div className='w-full max-w-[28%]'>
                <LoginForm
                    onSubmit={handleSubmit}
                    isSubmitting={isLoading}
                    error={error}
                    signupUrl="/register"
                />
            </div>
        </main>
    );
}

// Export wrapped in Suspense
export default function LoginPage() {
    return (
        <Suspense fallback={<LoginLoading />}>
            <LoginContent />
        </Suspense>
    );
}
