"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaUserShield } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md";

const formSchema = z.object({
  username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
  fullname: z.string().nonempty("Fullname is required"),
  email: z.string().nonempty("Email is required").email("Định dạng email không chính xác"),
  password: z.string().nonempty("Password is required").min(8, "Mật khẩu phải ít nhất 8 ký tự"),
});

export type RegisterFormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  registerText?: string;
  googleText?: string;
  signinText?: string;
  signinUrl?: string;
  formAction: (formData: FormData) => Promise<void>;
}

export default function RegisterForm({
  heading = "VN Academy",
  subheading = "Tạo ngay cho mình một tài khoản",
  imageUrl = "https://source.unsplash.com/600x600/?education,technology",
  registerText = "Đăng ký",
  googleText = "Đăng nhập bằng Google",
  signinText = "Đã có tài khoản?",
  signinUrl = "#",
  formAction,
}: RegisterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      console.log("Form data:", data);

      //await formAction(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-9 px-4 sm:px-8 flex flex-col items-center gap-4">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-8">
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold">{heading}</p>
            <p className="text-muted-foreground">{subheading}</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label>Username</Label>
                    <FormControl>
                      <Input type="text" placeholder="Nhập username của bạn" iconLeft={<FaUserShield />} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <Label>Fullname</Label>
                    <FormControl>
                      <Input type="text" placeholder="Nhập tên đầy đủ của bạn" iconLeft={<MdOutlineDriveFileRenameOutline />} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input type="email" placeholder="Nhập email của bạn" iconLeft={<MdEmail />} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu của bạn" iconLeft={<IoMdLock />} passwordEye={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-2 w-full bg-black text-white" disabled={isSubmitting}>
                {isSubmitting ? "Đang đăng ký..." : registerText}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-500">
                <span className="relative z-10 bg-white px-2 text-muted-foreground">Hoặc sử dụng tài khoản liên kết</span>
              </div>

              <Button type="button" variant="outline" className="w-full border-gray-400" disabled={isSubmitting} onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Hello",
                    onClick: () => console.log("Undo"),
                    type: "success",
                  
                  }
                  
                  
                })}>
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>
            </form>
          </Form>

          <div className="mx-auto mt-6 flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signinText}</p>
            <a href={signinUrl} className="font-medium text-primary hover:underline">
              Đăng nhập
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-200 items-center justify-center">
          <img src={imageUrl} alt="Register Illustration" className="h-full w-full object-cover flex items-center justify-center" />
        </div>
      </div>

      {/* Terms & Privacy Policy Text */}
      <div className="w-full text-center text-muted-foreground text-xs mt-2 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a className="" href="#">Terms of Service</a>{" "}
        and <a className="" href="#">Privacy Policy</a>.
      </div>
    </section>
  );
}

