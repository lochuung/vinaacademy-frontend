export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "REFUNDED";

export interface PaymentDto {
  id: string;
  orderId: string;
  amount: string;
  createdAt: string;
  paymentData: any;
  paymentMethod: string;
  paymentStatus: PaymentStatus
  transactionId: string;
  urlPayment: string;
}

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED" | "FAILED"; 

export interface OrderDto {
  id: string; // UUID
  status: OrderStatus;
  subTotal: number;
  totalAmount: number;
  discountAmount: number;
  coupon_id: string | null;
  user_id: string;
  payment_id: string;
}

export interface OrderItemDto {
  id: number; 
  order_id: string; 
  course_id: string; 
  price: number; 
}

export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT'; // adjust based on your Java enum

export interface CouponDto {
  id: string; // UUID
  code: string;
  discountType: DiscountType;
  discountValue: string; // BigDecimal as string
  expiredAt: string; // ISO date string (LocalDateTime)
  maxDiscountAmount: string;
  minOrderValue: string;
  startedAt: string;
  usageLimit: number;
  usedCount: number;
  valid: boolean;
}
