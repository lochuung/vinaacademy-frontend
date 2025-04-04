'use client';

import LoginForm, { LoginFormValues } from '@/components/ui/loginform';
import React, {useState} from "react";
import {LoginCredentials} from "@/types/auth";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {login, isAuthenticated} = useAuth();
    const router = useRouter();

    if (isAuthenticated) {
        router.push('/');
        return null;
    }

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
                router.push('/');
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
        <main className='flex items-center justify-center h-fit bg-gradient-to-tl from-gray-300 via-gray-200 to-neutral-300'>
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
