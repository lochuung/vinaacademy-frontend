'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import VerifyAccount from '@/components/ui/verifyaccount';
import { Card } from "@/components/ui/card";

export default function VerifyAccountPage() {
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