import * as React from 'react';

import {useCallbackRef} from './use-callback-ref';

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx
 *
 * Loại tham số cho hook useControllableState: bao gồm giá trị được kiểm soát (prop),
 // giá trị mặc định (defaultProp) và hàm onChange để thông báo khi state thay đổi.
 */
type UseControllableStateParams<T> = {
    prop?: T | undefined;
    defaultProp?: T | undefined;
    onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

/**
 * Hook useControllableState cho phép component hoạt động theo 2 chế độ:
 * - Kiểm soát bên ngoài (controlled): khi prop được truyền vào
 * - Tự quản lý nội bộ (uncontrolled): khi không có prop, sử dụng defaultProp và nội bộ state
 *
 * @param param0 - Các tham số gồm prop, defaultProp và onChange.
 * @returns Một tuple gồm giá trị hiện tại và hàm setValue để cập nhật state.
 */
function useControllableState<T>({
                                     prop,
                                     defaultProp,
                                     onChange = () => {
                                     }
                                 }: UseControllableStateParams<T>) {
    // Sử dụng hook useUncontrolledState để khởi tạo state nội bộ từ defaultProp và onChange
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
        defaultProp,
        onChange
    });

    // Kiểm tra xem có phải controlled component không: nếu prop !== undefined thì là controlled
    const isControlled = prop !== undefined;
    // Giá trị được sử dụng: nếu controlled thì dùng prop, ngược lại dùng uncontrolledProp
    const value = isControlled ? prop : uncontrolledProp;
    // Sử dụng useCallbackRef để đảm bảo hàm onChange luôn cập nhật và ổn định
    const handleChange = useCallbackRef(onChange);

    // Hàm setValue để cập nhật state
    // Nếu là controlled component thì chỉ gọi handleChange, còn không thì cập nhật state nội bộ
    const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
        React.useCallback(
            (nextValue) => {
                if (isControlled) {
                    // Nếu nextValue là một hàm, thực thi nó với giá trị prop hiện tại
                    const setter = nextValue as SetStateFn<T>;
                    const value =
                        typeof nextValue === 'function' ? setter(prop) : nextValue;
                    // Nếu giá trị mới khác giá trị hiện tại, gọi handleChange
                    if (value !== prop) handleChange(value as T);
                } else {
                    // Nếu uncontrolled, cập nhật state nội bộ
                    setUncontrolledProp(nextValue);
                }
            },
            [isControlled, prop, setUncontrolledProp, handleChange]
        );

    // Trả về giá trị hiện tại và hàm cập nhật state
    return [value, setValue] as const;
}

/**
 * Hook useUncontrolledState quản lý state nội bộ cho các component không được kiểm soát.
 * Nó cũng gọi onChange mỗi khi state thay đổi so với giá trị trước đó.
 *
 * @param param0 - Object chứa defaultProp và onChange.
 * @returns Một tuple chứa state nội bộ và hàm setter của state.
 */
function useUncontrolledState<T>({
                                     defaultProp,
                                     onChange
                                 }: Omit<UseControllableStateParams<T>, 'prop'>) {
    // Khởi tạo state nội bộ với defaultProp
    const uncontrolledState = React.useState<T | undefined>(defaultProp);
    const [value] = uncontrolledState;
    // Sử dụng ref để lưu lại giá trị trước đó của state
    const prevValueRef = React.useRef(value);
    // Đảm bảo onChange luôn cập nhật mới nhất bằng useCallbackRef
    const handleChange = useCallbackRef(onChange);

    // Khi giá trị state thay đổi, nếu khác với giá trị trước đó thì gọi handleChange và cập nhật ref
    React.useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value as T);
            prevValueRef.current = value;
        }
    }, [value, prevValueRef, handleChange]);

    return uncontrolledState;
}

export {useControllableState};