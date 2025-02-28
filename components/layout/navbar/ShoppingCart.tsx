import { CartItem } from "@/types/navbar"; // Import kiểu dữ liệu CartItem từ thư mục types/navbar
import { CartButton } from "./CartButton"; // Import component CartButton
import { CartItemList } from "./CartItemList"; // Import component CartItemList
import { ViewCartButton } from "./ViewCartButton"; // Import component ViewCartButton

// Định nghĩa interface cho các props của component ShoppingCart
interface ShoppingCartProps {
    items: CartItem[]; // Prop items là một mảng các đối tượng CartItem
    onRemoveItem: (id: number) => void; // Prop onRemoveItem là một hàm nhận vào id và không trả về giá trị
}

// Định nghĩa component ShoppingCart
const ShoppingCart = ({ items }: ShoppingCartProps) => {
    // Tính tổng giá trị của các mục trong giỏ hàng
    const total = items.reduce((sum, item) => sum + Number(item.price.replace(/\D/g, '')), 0);

    return (
        <div className="relative group">
            <CartButton itemCount={items.length} /> {/* Hiển thị CartButton với số lượng mục trong giỏ hàng */}

            <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Giỏ hàng</h3>
                        <span className="text-sm text-gray-500">{items.length} khóa học</span> {/* Hiển thị số lượng khóa học */}
                    </div>

                    <CartItemList items={items} /> {/* Hiển thị danh sách các mục trong giỏ hàng */}

                    {items.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium">Tổng cộng:</span>
                                <span className="font-bold text-lg">{total}K VND</span> {/* Hiển thị tổng giá trị */}
                            </div>
                            <ViewCartButton /> {/* Hiển thị nút ViewCartButton */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart; // Xuất component ShoppingCart để sử dụng ở nơi khác