'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {useBreadcrumbs} from '@/hooks/use-breadcrumbs';
import {Slash} from 'lucide-react';
import {Fragment} from 'react';

// Component Breadcrumbs hiển thị đường dẫn điều hướng (breadcrumbs) dựa trên hook useBreadcrumbs
export function Breadcrumbs() {
    // Lấy danh sách các mục breadcrumbs từ hook useBreadcrumbs
    const items = useBreadcrumbs();

    // Nếu không có mục breadcrumbs nào, không hiển thị gì cả
    if (items.length === 0) return null;

    return (
        // Thành phần chứa toàn bộ breadcrumbs
        <Breadcrumb>
            {/* Danh sách các breadcrumbs */}
            <BreadcrumbList>
                {/* Lặp qua từng mục trong danh sách breadcrumbs */}
                {items.map((item, index) => (
                    <Fragment key={item.title}>
                        {/* Nếu không phải mục cuối cùng, hiển thị BreadcrumbItem chứa liên kết */}
                        {index !== items.length - 1 && (
                            <BreadcrumbItem className='hidden md:block'>
                                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                        {/* Nếu không phải mục cuối cùng, hiển thị dấu phân cách (separator) */}
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator className='hidden md:block'>
                                <Slash/>
                            </BreadcrumbSeparator>
                        )}
                        {/* Nếu là mục cuối cùng, hiển thị BreadcrumbPage (điểm hiện tại) */}
                        {index === items.length - 1 && (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}