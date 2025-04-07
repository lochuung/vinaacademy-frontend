
export interface CategoryDto {
    id: number;
    name: string;
    slug: string;
    parentSlug?: string;
    children: CategoryDto[];
}

export interface CategoryRequest {
    name: string;
    slug?: string;
    parentSlug?: string;
}