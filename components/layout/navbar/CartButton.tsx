import { FaShoppingCart } from "react-icons/fa"; // Import icon FaShoppingCart từ thư viện react-icons

interface CartButtonProps {
    itemCount: number; // Định nghĩa prop itemCount là một số
}


export const CartButton = ({ itemCount }: CartButtonProps) => {
    return (
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FaShoppingCart className="w-5 h-5 text-black" />
            {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
/**
 * CartButton component renders a button with a shopping cart icon and an optional item count badge.
 * Component CartButton hiển thị một nút với icon giỏ hàng và một badge tùy chọn hiển thị số lượng mặt hàng.
 *
 * @param {CartButtonProps} props - The props for the CartButton component.
 * @param {number} props.itemCount - The number of items in the cart. If greater than 0, a badge with the item count is displayed.
 * @param {number} props.itemCount - Số lượng mặt hàng trong giỏ. Nếu lớn hơn 0, một badge hiển thị số lượng mặt hàng sẽ được hiển thị.
 *
 * @returns {JSX.Element} The rendered CartButton component.
 * @returns {JSX.Element} Component CartButton được render.
 *
 * @component
 * @example
 * // Example usage of CartButton component
 * // Ví dụ sử dụng component CartButton
 * <CartButton itemCount={3} />
 *
 * @element button - The main button element with styling and hover effects.
 * @element button - Phần tử nút chính với các hiệu ứng styling và hover.
 * @attribute className - The CSS classes for styling the button.
 * @attribute className - Các lớp CSS để styling nút.
 * - `relative`: Positions the button relative to its normal position, allowing the badge to be positioned absolutely within it.
 * - `relative`: Định vị nút tương đối với vị trí bình thường của nó, cho phép badge được định vị tuyệt đối bên trong nó.
 * - `p-2`: Adds padding of 0.5rem (8px) on all sides.
 * - `p-2`: Thêm padding 0.5rem (8px) cho tất cả các cạnh.
 * - `hover:bg-gray-100`: Changes the background color to a light gray when the button is hovered over.
 * - `hover:bg-gray-100`: Thay đổi màu nền thành màu xám nhạt khi nút được hover.
 * - `rounded-full`: Makes the button fully rounded.
 * - `rounded-full`: Làm cho nút trở nên tròn hoàn toàn.
 * - `transition-colors`: Enables smooth transition effects for color changes.
 * - `transition-colors`: Kích hoạt hiệu ứng chuyển đổi mượt mà cho các thay đổi màu sắc.
 * - `duration-200`: Sets the duration of the transition to 200ms.
 * - `duration-200`: Đặt thời gian chuyển đổi là 200ms.
 * @element FaShoppingCart - The shopping cart icon from FontAwesome.
 * @element FaShoppingCart - Icon giỏ hàng từ FontAwesome.
 * @attribute className - The CSS classes for styling the icon.
 * @attribute className - Các lớp CSS để styling icon.
 * - `w-5`: Sets the width of the icon to 1.25rem (20px).
 * - `w-5`: Đặt chiều rộng của icon là 1.25rem (20px).
 * - `h-5`: Sets the height of the icon to 1.25rem (20px).
 * - `h-5`: Đặt chiều cao của icon là 1.25rem (20px).
 * - `text-black`: Sets the color of the icon to black.
 * - `text-black`: Đặt màu của icon là màu đen.
 * @element span - The badge element that displays the item count.
 * @element span - Phần tử badge hiển thị số lượng mặt hàng.
 * @attribute className - The CSS classes for styling the badge.
 * @attribute className - Các lớp CSS để styling badge.
 * - `absolute`: Positions the badge absolutely within the button.
 * - `absolute`: Định vị badge tuyệt đối bên trong nút.
 * - `-top-0`: Positions the badge at the top of the button with a slight offset.
 * - `-top-0`: Định vị badge ở phía trên của nút với một chút lệch.
 * - `-right-0`: Positions the badge at the right of the button with a slight offset.
 * - `-right-0`: Định vị badge ở phía bên phải của nút với một chút lệch.
 * - `flex`: Uses flexbox layout for the badge content.
 * - `flex`: Sử dụng layout flexbox cho nội dung của badge.
 * - `items-center`: Centers the badge content vertically.
 * - `items-center`: Căn giữa nội dung của badge theo chiều dọc.
 * - `justify-center`: Centers the badge content horizontally.
 * - `justify-center`: Căn giữa nội dung của badge theo chiều ngang.
 * - `bg-red-500`: Sets the background color of the badge to a red shade.
 * - `bg-red-500`: Đặt màu nền của badge là màu đỏ.
 * - `text-white`: Sets the text color of the badge to white.
 * - `text-white`: Đặt màu chữ của badge là màu trắng.
 * - `text-xs`: Sets the font size of the badge text to extra small.
 * - `text-xs`: Đặt kích thước font của chữ trong badge là rất nhỏ.
 * - `font-bold`: Makes the badge text bold.
 * - `font-bold`: Làm cho chữ trong badge trở nên đậm.
 * - `w-5`: Sets the width of the badge to 1.25rem (20px).
 * - `w-5`: Đặt chiều rộng của badge là 1.25rem (20px).
 * - `h-5`: Sets the height of the badge to 1.25rem (20px).
 * - `h-5`: Đặt chiều cao của badge là 1.25rem (20px).
 * - `rounded-full`: Makes the badge fully rounded.
 * - `rounded-full`: Làm cho badge trở nên tròn hoàn toàn.
 */