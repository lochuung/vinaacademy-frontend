'use client';

import {Search} from 'lucide-react';
import {Button} from '../ui/button';
import {useState} from 'react';

export default function SearchInput() {
    // Tạo state 'query' để lưu trữ từ khóa tìm kiếm, khởi tạo ban đầu là chuỗi rỗng
    const [query, setQuery] = useState('');

    return (
        <div className='w-full space-y-2'>
            {/* Nút tìm kiếm với kiểu outline */}
            <Button
                variant='outline'
                className='relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
                // Khi nhấn nút, hàm onClick sẽ xóa giá trị tìm kiếm bằng cách đặt query thành chuỗi rỗng
                onClick={() => setQuery('')}
            >
                {/* Biểu tượng tìm kiếm */}
                <Search className='mr-2 h-4 w-4'/>
                Search...
                {/* Hiển thị phím tắt, ẩn trên thiết bị nhỏ và hiển thị khi screen đủ lớn */}
                <kbd
                    className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </Button>
        </div>
    );
}