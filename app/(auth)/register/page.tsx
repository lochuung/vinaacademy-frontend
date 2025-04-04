'use client';

import RegisterForm, { RegisterFormValues } from '@/components/ui/registerform';
import React, { useState } from "react";
import { RegisterRequest } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);
    const handleSubmit = async (data: RegisterRequest) => {
        setError(null);
        setIsLoading(true);

        try {
            const success = await register(data);

            if (success) {
                // Redirect to login page on successful registration
                router.push('/login?registered=true');
                return true;
            } else {
                setError('Registration failed. Please try again.');
                return false;
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during registration.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className='flex items-center justify-center min-h-screen bg-gradient-to-tl from-gray-300 via-gray-200 to-neutral-300'>
            <div className='w-full max-w-4xl'>
                <RegisterForm 
                    onSubmit={handleSubmit}
                    isSubmitting={isLoading}
                    error={error}
                    signinUrl="/login"
                />
            </div>
        </main>
    );
}
