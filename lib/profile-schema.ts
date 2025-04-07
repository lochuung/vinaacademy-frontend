import * as z from "zod";

export const profileFormSchema = z.object({
    avatar: z.any().optional(), // Changed to accept file object
    fullName: z.string()
        .min(2, {message: "Tên phải có ít nhất 2 ký tự"})
        .max(50, {message: "Tên không được vượt quá 50 ký tự"}),
    email: z.string().email({message: "Email không hợp lệ"}),
    phone: z.string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            {message: "Số điện thoại không hợp lệ"}),
    dateOfBirth: z.date().optional(),
    description: z.string()
        .max(500, {message: "Mô tả không được vượt quá 500 ký tự"})
        .optional(),
});

export const passwordFormSchema = z.object({
    currentPassword: z.string().min(1, {message: "Vui lòng nhập mật khẩu hiện tại"}),
    newPassword: z.string()
        .min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {message: "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt"}),
    confirmPassword: z.string().min(1, {message: "Vui lòng xác nhận mật khẩu"})
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});