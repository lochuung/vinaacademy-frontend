'use client'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { KeyRound } from "lucide-react";
import { passwordFormSchema } from '@/lib/profile-schema';


import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function PasswordChange() {
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    // Default password form values
    const defaultPasswordValues: Partial<PasswordFormValues> = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };
    // Initialize the password form
    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: defaultPasswordValues,
        mode: "onChange",
    });
    // Password form submission handler
    function onPasswordSubmit(data: PasswordFormValues) {
        try {
            // Here you would typically send the password data to your backend
            console.log("Password data to be submitted:", data);

            toast("Mật khẩu đã được thay đổi", {
                description: "Mật khẩu mới đã được cập nhật thành công.",
            });

            // Close dialog and reset form
            setPasswordDialogOpen(false);
            passwordForm.reset();
        } catch (error) {
            toast("Lỗi", {
                description: "Không thể thay đổi mật khẩu. Vui lòng thử lại.",
            });
        }
    }
    return (
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" type="button" className="w-full flex items-center">
                    <KeyRound className="mr-2 h-4 w-4" />
                    Đổi mật khẩu
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Đổi mật khẩu</DialogTitle>
                    <DialogDescription>
                        Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi
                    </DialogDescription>
                </DialogHeader>
                <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        {/* Current Password */}
                        <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Nhập mật khẩu hiện tại"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu mới</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Nhập mật khẩu mới"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <span className="text-xs italic text-slate-400">Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Xác nhận mật khẩu mới"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-4">
                            <Button variant="outline" type="button" onClick={() => setPasswordDialogOpen(false)}>
                                Hủy
                            </Button>
                            <Button type="submit">
                                Cập nhật mật khẩu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}