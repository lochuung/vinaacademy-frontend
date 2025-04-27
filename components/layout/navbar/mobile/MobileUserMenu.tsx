import Link from "next/link";
import { LogOut } from "lucide-react";

interface MobileUserMenuProps {
  cartItemsCount: number;
  totalUnread: number;
  onClose: () => void;
  onLogout: () => void;
}

const MobileUserMenu = ({ 
  cartItemsCount, 
  totalUnread, 
  onClose,
  onLogout
}: MobileUserMenuProps) => {
  return (
    <div className="space-y-4">
      <Link 
        href="/my-courses"
        className="block py-2 font-medium hover:text-gray-800"
        onClick={onClose}
      >
        Khóa học của tôi
      </Link>
      <Link 
        href="/cart"
        className="block py-2 font-medium hover:text-gray-800"
        onClick={onClose}
      >
        Giỏ hàng 
        {cartItemsCount > 0 && (
          <span className="ml-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
            {cartItemsCount}
          </span>
        )}
      </Link>
      <Link 
        href="/profile/notification"
        className="block py-2 font-medium hover:text-gray-800"
        onClick={onClose}
      >
        Thông báo
        {totalUnread > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {totalUnread}
          </span>
        )}
      </Link>
      <Link 
        href="/profile/info"
        className="block py-2 font-medium hover:text-gray-800"
        onClick={onClose}
      >
        Hồ sơ cá nhân
      </Link>
      
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="flex items-center w-full py-2 text-left font-medium text-red-600 hover:text-red-800"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Đăng xuất
      </button>
    </div>
  );
};

export default MobileUserMenu;
