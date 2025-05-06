export interface Payment {
    id: string;
    orderId: string;
    amount: string;
    createdAt: string;
    paymentData: any; 
    paymentMethod: string;
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
    transactionId: string;
    urlPayment: string;
}

export interface Order {
    id: string; // UUID
    status: 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED'; // adjust based on actual enum
    subTotal: number; 
    totalAmount: number;
    discountAmount: number;
    coupon_id: string | null; 
    user_id: string;
    payment_id: string;
  }
  