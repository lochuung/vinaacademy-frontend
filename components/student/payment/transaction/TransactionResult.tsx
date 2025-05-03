import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function PaymentResultContent() {
    const { useSearchParams } = require('next/navigation');
    const searchParams = useSearchParams();
    const router = useRouter();
    const [paymentData, setPaymentData] = useState({
      status: '',
      orderId: '',
      amount: '',
      currency: '',
      failureReason: '',
      transactionId: '',
      paymentMethod: '',
      timestamp: '',
    });
  
    useEffect(() => {
      // Extract all relevant payment parameters from URL
      const status = searchParams.get('status') || '';
      const orderId = searchParams.get('orderId') || '';
      const amount = searchParams.get('amount') || '';
      const currency = searchParams.get('currency') || '';
      const failureReason = searchParams.get('failureReason') || '';
      const transactionId = searchParams.get('transactionId') || '';
      const paymentMethod = searchParams.get('paymentMethod') || '';
      const timestamp = searchParams.get('timestamp') || new Date().toISOString();
  
      setPaymentData({
        status,
        orderId,
        amount,
        currency,
        failureReason,
        transactionId,
        paymentMethod,
        timestamp,
      });
    }, [searchParams]);
  
    const isSuccess = paymentData.status === 'success';
  
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        {/* Header with status icon */}
        <div className="flex flex-col items-center mb-6">
          {isSuccess ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <h1 className="text-2xl font-bold text-center">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>
        </div>
  
        {/* Payment details */}
        <div className="space-y-4 mb-6">
          {paymentData.orderId && (
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{paymentData.orderId}</span>
            </div>
          )}
          
          {paymentData.amount && paymentData.currency && (
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: paymentData.currency
                }).format(parseFloat(paymentData.amount))}
              </span>
            </div>
          )}
  
          {paymentData.transactionId && (
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">{paymentData.transactionId}</span>
            </div>
          )}
  
          {paymentData.paymentMethod && (
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{paymentData.paymentMethod}</span>
            </div>
          )}
  
          {paymentData.timestamp && (
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(paymentData.timestamp).toLocaleString()}
              </span>
            </div>
          )}
  
          {/* Show failure reason if payment failed */}
          {!isSuccess && paymentData.failureReason && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
              <h3 className="text-sm font-medium text-red-800">Reason for failure:</h3>
              <p className="mt-1 text-sm text-red-700">{paymentData.failureReason}</p>
            </div>
          )}
        </div>
  
        {/* Success message & next steps */}
        {isSuccess && (
          <div className="mb-6 text-center">
            <p className="text-gray-700">
              Thank you for your purchase! We've sent a confirmation email with all the details.
            </p>
          </div>
        )}
  
        {/* Navigation buttons */}
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition-colors"
          >
            Back to Home
          </Link>
          
          {isSuccess && (
            <Link 
              href="/orders"
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md text-center transition-colors"
            >
              View My Orders
            </Link>
          )}
          
          {!isSuccess && (
            <button 
              onClick={() => router.back()}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md text-center transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }