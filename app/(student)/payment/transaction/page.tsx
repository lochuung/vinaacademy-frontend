'use client';


import { Suspense } from 'react';
import { PaymentResultLoading } from '@/components/student/payment/transaction/TransactionLoading';
import { PaymentResultContent } from '@/components/student/payment/transaction/TransactionResult';

// Main page component with Suspense boundary
export default function PaymentResultPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Suspense fallback={<PaymentResultLoading />}>
        <PaymentResultContent />
      </Suspense>
    </div>
  );
}