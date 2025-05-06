'use client';

import {useState} from 'react';
import Image from 'next/image';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

type PaymentMethod = 'vnpay' | 'credit-card';
type SavedCard = {
    id: string;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
};

type PaymentSelectionProps = {
    savedCards: SavedCard[];
    onPaymentMethodChange: (method: PaymentMethod) => void;
    onPaymentInitiate: (method: PaymentMethod, cardId?: string) => void;
};

const PaymentSelection = ({
                              savedCards,
                              onPaymentMethodChange,
                              onPaymentInitiate
                          }: PaymentSelectionProps) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vnpay');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);

    // Helper function to mask card number
    const maskCardNumber = (card: SavedCard) => {
        return `${card.brand} •••• ${card.last4} (${card.expMonth}/${card.expYear})`;
    };

    const handlePaymentMethodChange = (value: string) => {
        const method = value as PaymentMethod;
        setPaymentMethod(method);
        onPaymentMethodChange(method);
    };

    const handleInitiatePayment = () => {
        if (paymentMethod === 'vnpay') {
            onPaymentInitiate('vnpay');
        } else {
            onPaymentInitiate('credit-card', selectedCard || undefined);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6 text-center">Phương thức thanh toán</h2>

            <Tabs
                defaultValue="vnpay"
                value={paymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vnpay">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/vnpay-logo.png"
                                alt="VNPay"
                                width={20}
                                height={20}
                            />
                            VNPay
                        </div>
                    </TabsTrigger>
                    {/* <TabsTrigger value="credit-card">
                        <div className="flex items-center gap-2">
                            💳 Thẻ tín dụng
                        </div>
                    </TabsTrigger> */}
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="vnpay">
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/vnpay-logo.png"
                                    alt="VNPay"
                                    width={40}
                                    height={40}
                                />
                                <span className="font-medium">Cổng thanh toán VNPay</span>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-medium mb-2">Hướng dẫn thanh toán:</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                                    <li>Nhấn nút "Tiến hành thanh toán" bên dưới</li>
                                    <li>Bạn sẽ được chuyển đến trang thanh toán của VN PAY</li>
                                    <li>Hoàn tất thanh toán bằng ngân hàng hoặc phương thức thanh toán bạn chọn</li>
                                    <li>Sau khi thanh toán thành công, bạn sẽ được chuyển về trang web của chúng tôi
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="credit-card">
                        <div className="space-y-4">
                            {/* Saved Cards Selection */}
                            <div>
                                <Label className="mb-2 block">Chọn thẻ đã lưu</Label>
                                <RadioGroup
                                    value={selectedCard || ''}
                                    onValueChange={setSelectedCard}
                                    className="space-y-2"
                                >
                                    {savedCards.map((card) => (
                                        <div key={card.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={card.id} id={`card-${card.id}`}/>
                                            <Label htmlFor={`card-${card.id}`} className="flex-1">
                                                {maskCardNumber(card)}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {/* Add New Card Dialog */}
                            <Dialog open={isAddingNewCard} onOpenChange={setIsAddingNewCard}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        + Thêm thẻ mới
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Thêm thẻ tín dụng mới</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Tên chủ thẻ</Label>
                                            <Input placeholder="Nhập tên chủ thẻ"/>
                                        </div>
                                        <div>
                                            <Label>Số thẻ</Label>
                                            <Input placeholder="Nhập số thẻ"/>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Ngày hết hạn</Label>
                                                <Input placeholder="MM/YY"/>
                                            </div>
                                            <div>
                                                <Label>CVV</Label>
                                                <Input placeholder="CVV"/>
                                            </div>
                                        </div>
                                        <Button className="w-full">Lưu thẻ</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Info for credit card */}
                            <div className="mt-6">
                                <h3 className="font-medium mb-2">Hướng dẫn thanh toán:</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                                    <li>Chọn thẻ credit bạn muốn thanh toán</li>
                                    <li>Nếu chưa có hãy bấm "Thêm thẻ mới" để thêm vào</li>
                                    <li>Nhấn nút "Tiến hành thanh toán" bên dưới đơn hàng</li>
                                    <li>Sau khi thanh toán thành công, bạn sẽ được chuyển về trang web của chúng tôi
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            <Button
                className="w-full bg-black text-white py-6 rounded-lg mt-6 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-base font-medium h-16"
                onClick={handleInitiatePayment}
                disabled={paymentMethod === 'credit-card' && !selectedCard && !isAddingNewCard}
            >
                {paymentMethod === 'vnpay' ? (
                    <Image
                        src="/vnpay-logo.png"
                        alt="VNPay"
                        width={28}
                        height={28}
                    />
                ) : (
                    '💳'
                )}
                Tiến hành thanh toán
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Bằng việc hoàn tất thanh toán, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.
            </p>
        </div>
    );
};

export default PaymentSelection;
export type {PaymentMethod, SavedCard};