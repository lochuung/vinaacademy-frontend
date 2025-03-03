import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ProductListingPage from '@/features/products/components/product-listing';
import ProductTableAction from '@/features/products/components/product-tables/product-table-action';

export const metadata = {
    title: 'Dashboard: Courses',
    description: 'Quản lý khóa học (Chức năng bảng phía máy chủ).',
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
    const searchParams = await props.searchParams;
    // Cho phép các RSC lồng nhau truy cập các tham số tìm kiếm (một cách an toàn về kiểu dữ liệu)
    searchParamsCache.parse(searchParams);

    // Khóa này được sử dụng để kích hoạt suspense nếu bất kỳ tham số tìm kiếm nào thay đổi (dùng cho bộ lọc).
    const key = serialize({ ...searchParams });

    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading
                        title='Khóa học'
                        description='Quản lý khóa học'
                    />
                    <Link
                        href='/dashboard/course/new'
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className='mr-2 h-4 w-4' /> Thêm mới
                    </Link>
                </div>
                <Separator />
                <ProductTableAction />
                <Suspense
                    key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <ProductListingPage />
                </Suspense>
            </div>
        </PageContainer>
    );
}