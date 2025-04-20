'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, MailCheck } from "lucide-react";
import Link from "next/link";
import { verifyAccount, resendVerificationEmail } from "@/services/authService";
import { toast } from 'react-toastify';

interface VerifyAccountProps {
    token: string;
    signature: string;
    email?: string;
}

export default function VerifyAccount({ token, signature, email }: VerifyAccountProps) {
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [isResendingEmail, setIsResendingEmail] = useState(false);

    useEffect(() => {
        const verify = async () => {
            if (!token || !signature) {
                setIsVerifying(false);
                return;
            }

            try {
                const success = await verifyAccount(token, signature);
                setIsVerified(success);
                if (success) {
                    toast.success("Xác thực tài khoản thành công!");
                } else {
                    toast.error("Xác thực tài khoản thất bại. Liên kết có thể đã hết hạn.");
                }
            } catch (error) {
                console.error("Verification error:", error);
                toast.error("Có lỗi xảy ra khi xác thực tài khoản.");
            } finally {
                setIsVerifying(false);
            }
        };

        verify();
    }, [token, signature]);

    const handleResendEmail = async () => {
        if (!email) {
            toast.error("Không có email để gửi lại xác thực.");
            return;
        }

        setIsResendingEmail(true);
        try {
            const success = await resendVerificationEmail(email);
            if (success) {
                toast.success("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư của bạn.");
            } else {
                toast.error("Không thể gửi lại email xác thực. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Resend verification email error:", error);
            toast.error("Có lỗi xảy ra khi gửi lại email xác thực.");
        } finally {
            setIsResendingEmail(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-6 text-center">
            {isVerifying ? (
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <h2 className="text-2xl font-bold">Đang xác thực tài khoản...</h2>
                    <p className="text-muted-foreground">Vui lòng chờ trong giây lát.</p>
                </div>
            ) : isVerified ? (
                <div className="flex flex-col items-center space-y-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                    <h2 className="text-2xl font-bold">Xác thực tài khoản thành công!</h2>
                    <p className="text-muted-foreground">
                        Tài khoản của bạn đã được xác thực thành công. Bạn có thể đăng nhập ngay bây giờ.
                    </p>
                    <Button asChild>
                        <Link href="/login">Đăng nhập</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <XCircle className="h-16 w-16 text-red-500" />
                    <h2 className="text-2xl font-bold">Xác thực tài khoản thất bại</h2>
                    <p className="text-muted-foreground">
                        Liên kết xác thực có thể đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email xác thực.
                    </p>
                    {email ? (
                        <Button 
                            onClick={handleResendEmail}
                            disabled={isResendingEmail}
                        >
                            {isResendingEmail ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <MailCheck className="mr-2 h-4 w-4" />
                                    Gửi lại email xác thực
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Quay lại đăng nhập</Link>
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}