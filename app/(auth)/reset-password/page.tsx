'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import ResetPasswordForm, { ResetPasswordFormValues } from "@/components/ui/resetpasswordform";
import { checkResetPasswordToken, resetPassword } from "@/services/authService";
import { toast } from 'react-toastify';
import { Loader2, XCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [isValidating, setIsValidating] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    
    const token = searchParams.get('token') || '';
    const signature = searchParams.get('signature') || '';

    useEffect(() => {
        const validateToken = async () => {
            if (!token || !signature) {
                setIsValidating(false);
                setIsValidToken(false);
                setError('Liên kết không hợp lệ hoặc đã hết hạn');
                return;
            }

            try {
                const isValid = await checkResetPasswordToken(token, signature);
                setIsValidToken(isValid);
                if (!isValid) {
                    setError('Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn');
                }
            } catch (error) {
                console.error('Token validation error:', error);
                setError('Có lỗi xảy ra khi xác thực liên kết đặt lại mật khẩu');
                setIsValidToken(false);
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token, signature]);

    const handleResetPassword = async (data: ResetPasswordFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const success = await resetPassword({
                token,
                signature,
                password: data.password,
                retypedPassword: data.retypedPassword
            });

            if (success) {
                toast.success('Đặt lại mật khẩu thành công!');
                router.push('/login');
            } else {
                setError('Không thể đặt lại mật khẩu. Vui lòng thử lại');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setError('Có lỗi xảy ra khi đặt lại mật khẩu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-screen py-10">
            <Card className="w-full max-w-md p-6 shadow-lg">
                {isValidating ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-muted-foreground">Đang xác thực liên kết...</p>
                    </div>
                ) : isValidToken ? (
                    <ResetPasswordForm 
                        onSubmit={handleResetPassword}
                        isSubmitting={isSubmitting}
                        error={error}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <XCircle className="h-16 w-16 text-red-500" />
                        <h2 className="text-xl font-bold">Liên kết không hợp lệ</h2>
                        <p className="text-muted-foreground text-center">
                            {error || 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.'}
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/login">Quay lại đăng nhập</Link>
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}