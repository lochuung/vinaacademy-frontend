import React, {useState, useEffect, use} from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {categorySchema} from "@/lib/category-schema";
import {Category} from "@/types/category-type";

interface CategoryFormProps {
    categories: Category[];
    onSubmit: (data: z.infer<typeof categorySchema>) => Promise<void>;
    initialData?: Category;
    onCancel?: () => void;
}

export function CategoryForm({
                                 categories,
                                 onSubmit,
                                 initialData,
                                 onCancel
                             }: CategoryFormProps) {
    const [generatedSlug, setGeneratedSlug] = useState<string>('');

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData ? {
            name: initialData.name,
            slug: initialData.slug,
            parentId: initialData.parent?.id ?? undefined
        } : {
            name: '',
            slug: '',
            parentId: undefined
        }
    });

    // Automatically generate slug when name changes
    useEffect(() => {
        const name = form.getValues('name');
        const slug = name
            .normalize("NFD") // Normalize characters to split diacritics
            .replace(/\p{Diacritic}/gu, '') // Remove diacritics
            .toLowerCase()
            .replace(/đ/g, 'd')
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and dashes
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens

        form.setValue('slug', slug);
        setGeneratedSlug(slug);
    }, [form]);

    useEffect(() => {
        if (initialData) {
            form.setValue('name', initialData.name || '');
            form.setValue('slug', initialData.slug || '');
            form.setValue('parentId', initialData.parent?.id || -999);
        }
    }, [initialData, form]);

    const handleSubmit = async (values: z.infer<typeof categorySchema>) => {
        await onSubmit(values);
        form.reset();
    };

// Loop through categories and their children (even child in child) => 1d array
    const flatLoopChildren = (categories: Category[]): Category[] => {
        return categories.flatMap(category => [
            category,
            ...(category.children ? flatLoopChildren(category.children) : [])
        ]);
    }

    console.log('Categories:', flatLoopChildren(categories));
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên danh mục"  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Slug Url</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Url truy cập của danh mục"
                                    {...field}

                                />
                            </FormControl>
                            <FormDescription>
                                URL-thân thiện để truy cập đến
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="parentId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Danh mục cha</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(value === '-999' ? undefined : Number(value))}
                                defaultValue={field.value?.toString() ?? '-999'}
                                value={field.value?.toString() ?? '-999'}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a parent category"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>

                                    <SelectItem value="-999">[Trống]</SelectItem>

                                    {flatLoopChildren(categories).map((category) => (

                                        <SelectItem
                                            key={category.id}
                                            value={category.id?.toString() || ''}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Có thể chọn danh mục cha cho danh mục này. Nếu không muốn có thể chọn để [trống]
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <div className="flex space-x-2">
                    <Button type="submit" className="w-full">
                        {initialData ? 'Cập nhập danh mục' : 'Tạo danh mục'}
                    </Button>
                    {initialData && onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={onCancel}
                        >
                            Hủy
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}