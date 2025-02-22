import { CartItem } from "@/types/navbar";
import { CartButton } from "./CartButton";
import { CartItemList } from "./CartItemList";
import { ViewCartButton } from "./ViewCartButton";

interface ShoppingCartProps {
    items: CartItem[];
    onRemoveItem: (id: number) => void;
}

const ShoppingCart = ({ items }: ShoppingCartProps) => {
    const total = items.reduce((sum, item) => sum + Number(item.price.replace(/\D/g, '')), 0);

    return (
        <div className="relative group">
            <CartButton itemCount={items.length} />

            <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Giỏ hàng</h3>
                        <span className="text-sm text-gray-500">{items.length} khóa học</span>
                    </div>

                    <CartItemList items={items} />

                    {items.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium">Tổng cộng:</span>
                                <span className="font-bold text-lg">{total}K VND</span>
                            </div>
                            <ViewCartButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;