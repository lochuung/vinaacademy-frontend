"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./input";
import { Label } from "./label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { toast } from "react-toastify";
import { forgotPassword } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { createErrorToast, createSuccessToast } from "./toast-cus";

const formSchema = z.object({
    email: z
        .string()
        .nonempty("Email là bắt buộc")
        .email("Định dạng email không hợp lệ"),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

interface DialogForgotPasswordProps {
    open: boolean;
    onClose: () => void;
}

export default function DialogForgotPassword({ open, onClose }: DialogForgotPasswordProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function handleFormSubmit(data: ForgotPasswordFormValues) {
        setIsSubmitting(true);
        try {
            const success = await forgotPassword(data.email);
            if (success) {
                setIsSubmitSuccessful(true);
                createSuccessToast("Vui lòng kiểm tra email để đặt lại mật khẩu");
            } else {
                createErrorToast("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            createErrorToast("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleDialogClose() {
        form.reset();
        setIsSubmitSuccessful(false);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-[430px] gap-6 py-6">
                <DialogHeader>
                    <DialogTitle>Quên mật khẩu</DialogTitle>
                    <DialogDescription>
                        {!isSubmitSuccessful 
                            ? "Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu" 
                            : "Email hướng dẫn đã được gửi. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu."}
                    </DialogDescription>
                </DialogHeader>
                {!isSubmitSuccessful ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="email" className="text-left">
                                            Email
                                        </Label>
                                        <FormControl>
                                            <Input 
                                                id="email" 
                                                placeholder="Nhập email của bạn" 
                                                className="border-gray-300"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="pt-4">
                                <Button 
                                    type="submit" 
                                    className="w-full" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang gửi...
                                        </>
                                    ) : (
                                        "Gửi yêu cầu"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                ) : (
                    <DialogFooter>
                        <Button 
                            onClick={handleDialogClose} 
                            className="w-full"
                        >
                            Đóng
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
