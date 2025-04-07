'use client';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Modal} from '@/components/ui/modal';

// Định nghĩa giao diện cho các props của component AlertModal
interface AlertModalProps {
    isOpen: boolean;      // Xác định modal có đang mở hay không
    onClose: () => void;  // Hàm gọi khi đóng modal
    onConfirm: () => void;// Hàm gọi khi xác nhận hành động trong modal
    loading: boolean;     // Xác định trạng thái loading của modal
}

// Component AlertModal hiển thị một cảnh báo với modal
export const AlertModal: React.FC<AlertModalProps> = ({
                                                          isOpen,
                                                          onClose,
                                                          onConfirm,
                                                          loading
                                                      }) => {
    // State để kiểm tra component đã được mount trên client hay chưa
    const [isMounted, setIsMounted] = useState(false);

    // Sử dụng useEffect để cập nhật isMounted sau khi component mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Nếu chưa được mount, không render gì cả
    if (!isMounted) {
        return null;
    }

    return (
        // Chi tiết cấu hình của Modal, bao gồm tiêu đề, mô tả, trạng thái mở và hàm đóng
        <Modal
            title='Are you sure?'
            description='This action cannot be undone.'
            isOpen={isOpen}
            onClose={onClose}
        >
            {/* Vùng chứa các nút hành động được căn chỉnh về bên phải */}
            <div className='flex w-full items-center justify-end space-x-2 pt-6'>
                {/* Nút "Cancel" dùng để hủy bỏ và đóng modal */}
                <Button disabled={loading} variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                {/* Nút "Continue" dùng để xác nhận hành động */}
                <Button disabled={loading} variant='destructive' onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    );
};