import { FaShoppingCart } from "react-icons/fa";

interface CartButtonProps {
    itemCount: number;
}

/**
 * CartButton component renders a button with a shopping cart icon and an optional item count badge.
 *
 * @param {CartButtonProps} props - The props for the CartButton component.
 * @param {number} props.itemCount - The number of items in the cart. If greater than 0, a badge with the item count is displayed.
 *
 * @returns {JSX.Element} The rendered CartButton component.
 *
 * @component
 * @example
 * // Example usage of CartButton component
 * <CartButton itemCount={3} />
 *
 * @element button - The main button element with styling and hover effects.
 * @attribute className - The CSS classes for styling the button.
 * - `relative`: Positions the button relative to its normal position, allowing the badge to be positioned absolutely within it.
 * - `p-2`: Adds padding of 0.5rem (8px) on all sides.
 * - `hover:bg-gray-100`: Changes the background color to a light gray when the button is hovered over.
 * - `rounded-full`: Makes the button fully rounded.
 * - `transition-colors`: Enables smooth transition effects for color changes.
 * - `duration-200`: Sets the duration of the transition to 200ms.
 * @element FaShoppingCart - The shopping cart icon from FontAwesome.
 * @attribute className - The CSS classes for styling the icon.
 * - `w-5`: Sets the width of the icon to 1.25rem (20px).
 * - `h-5`: Sets the height of the icon to 1.25rem (20px).
 * - `text-black`: Sets the color of the icon to black.
 * @element span - The badge element that displays the item count.
 * @attribute className - The CSS classes for styling the badge.
 * - `absolute`: Positions the badge absolutely within the button.
 * - `-top-0`: Positions the badge at the top of the button with a slight offset.
 * - `-right-0`: Positions the badge at the right of the button with a slight offset.
 * - `flex`: Uses flexbox layout for the badge content.
 * - `items-center`: Centers the badge content vertically.
 * - `justify-center`: Centers the badge content horizontally.
 * - `bg-red-500`: Sets the background color of the badge to a red shade.
 * - `text-white`: Sets the text color of the badge to white.
 * - `text-xs`: Sets the font size of the badge text to extra small.
 * - `font-bold`: Makes the badge text bold.
 * - `w-5`: Sets the width of the badge to 1.25rem (20px).
 * - `h-5`: Sets the height of the badge to 1.25rem (20px).
 * - `rounded-full`: Makes the badge fully rounded.
 */
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
