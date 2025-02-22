import { Course } from '@/constants/data';
import { fakeCourses } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';

type ProductListingPage = {};

export default async function ProductListingPage({ }: ProductListingPage) {
    // Showcasing the use of search params cache in nested RSCs
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('q');
    const pageLimit = searchParamsCache.get('limit');
    const categories = searchParamsCache.get('categories');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
        ...(categories && { categories: categories })
    };

    const data = await fakeCourses.getCourses(filters);
    const totalProducts = data.total_products;
    const products: Course[] = data.products;

    return (
        <ProductTable
            columns={columns}
            data={products}
            totalItems={totalProducts}
        />
    );
}