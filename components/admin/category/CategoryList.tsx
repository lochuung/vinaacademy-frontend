import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Category} from "@/types/category-type";
import {MoreHorizontal, Edit, Trash, ChevronRight} from "lucide-react";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (categoryId: number) => void;
    numberEdit: number | undefined;
}

export function CategoryList({
                                 categories,
                                 onEdit,
                                 onDelete,
                                 numberEdit
                             }: CategoryListProps) {
    const renderCategoryItem = (category: Category, level = 0) => {
        return (
            <div key={category.id} className="space-y-2">
                <Card
                    className={`mb-2 ${level > 0 ? 'ml-' + (level * 3) : ''} ${numberEdit == category.id ? 'border-green-600 border-2' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                        <div className="flex items-center">
                            {level > 0 && <ChevronRight className="mr-2 h-4 w-4"/>}
                            <CardTitle className={`text-1xl`}>
                                {category.name}
                                <span className="text-sm text-muted-foreground ml-2">
                  ({category.slug})
                </span>
                            </CardTitle>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={() => onEdit(category)}
                                >
                                    <Edit className="mr-2 h-4 w-4"/> Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer text-destructive"
                                    onSelect={() => onDelete(category.id!)}
                                >
                                    <Trash className="mr-2 h-4 w-4"/> Xóa
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>

                    {/* Render Children Recursively */}
                    {category.children && category.children.length > 0 && (
                        <CardContent className="pt-0">
                            <div className="space-y-2">
                                {category.children.map(child => renderCategoryItem(child, level + 1))}
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        );
    };

    const renderCategories = () => {
        // Filter top-level categories (no parent)
        const topLevelCategories = categories.filter(c => !c.parent);

        return topLevelCategories.map(category => renderCategoryItem(category));
    };

    return (
        <div className="space-y-4">
            {renderCategories()}
        </div>
    );
}