import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "tên Category cần ít nhất 2 kí tự"),
  slug: z.string()
    .min(2, "Đường dẫn url cần ít nhất 2 kí tự")
    .regex(/^[a-z0-9-]+$/, "Url phải là kí tự viết thường, abc, số, hoặc có gạch nối"),
  parentId: z.number().optional()
});