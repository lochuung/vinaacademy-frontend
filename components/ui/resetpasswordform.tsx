'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { IoMdLock } from "react-icons/io";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    password: z
        .string()
        .nonempty("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    retypedPassword: z
        .string()
        .nonempty("Xác nhận mật khẩu là bắt buộc")
}).refine(data => data.password === data.retypedPassword, {
    message: "Mật khẩu không khớp",
    path: ["retypedPassword"],
});

export type ResetPasswordFormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
    onSubmit: (data: ResetPasswordFormValues) => Promise<void>;
    isSubmitting: boolean;
    error?: string | null;
}

export default function ResetPasswordForm({
    onSubmit,
    isSubmitting,
    error
}: ResetPasswordFormProps) {
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            retypedPassword: "",
        },
    });

    async function handleFormSubmit(data: ResetPasswordFormValues) {
        await onSubmit(data);
    }

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h1>
                <p className="text-muted-foreground">Nhập mật khẩu mới của bạn</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Mật khẩu mới</Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        iconLeft={<IoMdLock />}
                                        passwordEye={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="retypedPassword"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Xác nhận mật khẩu</Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu mới"
                                        iconLeft={<IoMdLock />}
                                        passwordEye={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button 
                        type="submit" 
                        className="w-full mt-4" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            "Đặt lại mật khẩu"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}