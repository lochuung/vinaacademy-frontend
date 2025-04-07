export interface CategoryDto {
    id: number;
    name: string;
    slug: string;
    parentSlug?: string;
    children: CategoryDto[]; // Each category can have multiple children, which are also CategoryDto objects
}

export interface CategoryRequest {
    name: string;
    slug?: string;
    parentSlug?: string;
}