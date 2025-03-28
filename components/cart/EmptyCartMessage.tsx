import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyCartMessage() {
    return (
        <div className="min-h-[0px] flex items-center justify-center w-full">
            <div className="bg-white p-28 rounded-lg text-center w-full max-w shadow-xl">
                <p className="text-gray-600 text-2xl mb-4">Giỏ hàng của bạn đang trống</p>
                <Button
                    className="bg-black hover:bg-gray-900 text-white text-sm px-8 py-3"
                    asChild
                >
                    <Link href="/courses">
                        Tiếp tục mua sắm
                    </Link>
                </Button>
            </div>
        </div>
    );
}