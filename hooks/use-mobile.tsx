import * as React from 'react';

// Định nghĩa breakpoint cho mobile (ví dụ: dưới 768px xem như mobile)
const MOBILE_BREAKPOINT = 768;

/**
 * Hook useIsMobile: trả về giá trị boolean xác định xem kích thước cửa sổ hiện tại có thuộc dạng mobile hay không.
 *
 * - Sử dụng window.matchMedia để theo dõi sự thay đổi của kích thước cửa sổ.
 * - Khi kích thước thay đổi, cập nhật state isMobile.
 *
 * @returns true nếu cửa sổ có chiều rộng nhỏ hơn MOBILE_BREAKPOINT, ngược lại trả về false.
 */
export function useIsMobile() {
    // Khởi tạo state isMobile, ban đầu chưa xác định (undefined)
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

    React.useEffect(() => {
        // Tạo MediaQueryList theo dõi khi chiều rộng cửa sổ nhỏ hơn MOBILE_BREAKPOINT
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        // Định nghĩa hàm onChange: cập nhật state dựa trên chiều rộng cửa sổ hiện tại
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        // Lắng nghe sự thay đổi của media query
        mql.addEventListener('change', onChange);
        // Thiết lập giá trị isMobile ban đầu dựa trên kích thước cửa sổ khi hook chạy lần đầu
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        // Cleanup: loại bỏ listener khi component bị unmount
        return () => mql.removeEventListener('change', onChange);
    }, []);

    // Ép kiểu về boolean: nếu isMobile là undefined thì chuyển thành false
    return !!isMobile;
}