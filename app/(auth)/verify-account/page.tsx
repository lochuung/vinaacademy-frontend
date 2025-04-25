'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VerifyAccount from '@/components/ui/verifyaccount';
import { Card } from "@/components/ui/card";

// Loading component for Suspense fallback
function VerifyAccountLoading() {
    return (
        <div className="container flex items-center justify-center min-h-screen py-10">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">VN Academy</h1>
                    <p className="text-muted-foreground">Đang tải...</p>
                </div>
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                </div>
            </Card>
        </div>
    );
}

// Component that uses useSearchParams
function VerifyAccountContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const signature = searchParams.get('signature') || '';
    const email = searchParams.get('email') || undefined;

    return (
        <div className="container flex items-center justify-center min-h-screen py-10">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">VN Academy</h1>
                    <p className="text-muted-foreground">Xác thực tài khoản</p>
                </div>
                <VerifyAccount token={token} signature={signature} email={email} />
            </Card>
        </div>
    );
}

// Export wrapped in Suspense
export default function VerifyAccountPage() {
    return (
        <Suspense fallback={<VerifyAccountLoading />}>
            <VerifyAccountContent />
        </Suspense>
    );
}