export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";
export type PaymentMethod = "vnpay";

export interface PaymentDto {
  id: string;
  orderId: string;
  amount: string;
  createdAt: string;
  paymentData: any;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  urlPayment: string;
}

export interface VNPayResponse {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export interface PaymentData {
  status: string;
  orderId: string;
  amount: string;
  currency: string;
  failureReason: string;
  transactionId: string;
  paymentMethod: string;
  timestamp: string;
  paymentStatus?: PaymentStatus;
  vnpResponse?: VNPayResponse;
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
  createdDate: string;
  paymentDto: PaymentDto;
  orderItemsDto: OrderItemDto[];
}

export interface OrderItemDto {
  id: number;
  order_id: string;
  course_name: string;
  url_image: string;
  course_id: string;
  price: number;
}

export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT"; // adjust based on your Java enum

export interface CouponDto {
  id: string; // UUID
  code: string;
  discountType: DiscountType;
  discountValue: number;
  expiredAt: string; // ISO date string (LocalDateTime)
  maxDiscountAmount: number;
  minOrderValue: number;
  startedAt: string;
  usageLimit: number;
  usedCount: number;
  valid: boolean;
}

export interface OrderCouponRequest {
  orderId: string;
  couponId: string;
}
