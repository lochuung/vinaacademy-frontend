import * as React from 'react'

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */

/**
 * Hook custom useCallbackRef:
 * Chuyển đổi một hàm callback thành một ref để tránh việc re-render không cần thiết khi callback được truyền dưới dạng prop,
 * hoặc để tránh việc re-execute các effect khi callback được sử dụng trong dependency array.
 *
 * @param callback - Hàm callback ban đầu, có thể là undefined.
 * @returns Một hàm callback ổn định, sẽ luôn tham chiếu đến giá trị mới nhất của callback.
 */
function useCallbackRef<T extends (...args: never[]) => unknown>(
    callback: T | undefined
): T {
    // Tạo một ref để lưu giữ hàm callback
    const callbackRef = React.useRef(callback);

    // Cập nhật giá trị của callbackRef mỗi khi callback thay đổi
    React.useEffect(() => {
        callbackRef.current = callback;
    });

    // Sử dụng useMemo để tạo một hàm ổn định không thay đổi giữa các lần render,
    // hàm này luôn gọi đến callback hiện tại được lưu trong callbackRef.
    // Điều này giúp tránh việc tạo ra các hàm mới gây re-render hoặc re-execute effect.
    return React.useMemo(
        () => ((...args) => callbackRef.current?.(...args)) as T,
        []
    );
}

export { useCallbackRef };