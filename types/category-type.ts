export interface Category {
    id?: number;
    name: string;
    slug: string;
    parent?: Category | null;
    children?: Category[];
    courses?: Course[];
}

export interface Course {
    id?: number;
    name: string;
    category: Category;
}

export interface CategoryFormData {
    name: string;
    slug: string;
    parentId?: number;
}