import * as z from "zod";

export const profileFormSchema = z.object({
    avatar: z.instanceof(File)
    .optional()
    .or(z.undefined()), // Changed to accept file object
    fullName: z.string()
        .min(2, {message: "Tên phải có ít nhất 2 ký tự"})
        .max(50, {message: "Tên không được vượt quá 50 ký tự"}),
    email: z.string().email({message: "Email không hợp lệ"}),
    phone: z.string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            {message: "Số điện thoại không hợp lệ"}).optional().or(z.literal("")),
    dateOfBirth: z
    .date({
      invalid_type_error: "Ngày sinh không hợp lệ",
    })
    .refine((date) => date < new Date(), {
      message: "Ngày sinh phải là ngày trong quá khứ",
    }).optional(),
    description: z.string()
        .max(1500, {message: "Mô tả không được vượt quá 500 ký tự"})
        .optional(),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
    retypedPassword: z.string().min(1, "Xác nhận mật khẩu không được để trống"),
  })
  .refine((data) => data.newPassword === data.retypedPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["retypedPassword"],
  });