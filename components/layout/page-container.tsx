import React from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';

// Component PageContainer dùng để chứa nội dung trang với khả năng cuộn nội dung nếu cần
export default function PageContainer({
                                          children,            // Các thành phần con sẽ được hiển thị bên trong container
                                          scrollable = true    // Thuộc tính cho biết liệu nội dung có cuộn được hay không
                                      }: {
    children: React.ReactNode;
    scrollable?: boolean;
}) {
    return (
        <>
            {scrollable ? (
                // Nếu thuộc tính scrollable là true, bọc nội dung trong ScrollArea với chiều cao được tính toán
                <ScrollArea className='h-[calc(100dvh-52px)]'>
                    <div className='flex flex-1 p-4 md:px-6'>
                        {children}
                    </div>
                </ScrollArea>
            ) : (
                // Nếu scrollable là false, hiển thị nội dung trong một div thông thường
                <div className='flex flex-1 p-4 md:px-6'>
                    {children}
                </div>
            )}
        </>
    );
}