// loginForm.tsx
"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";

//icon
import {FcGoogle} from "react-icons/fc";
import {FaUserShield} from "react-icons/fa";
import {IoMdLock} from "react-icons/io";
import DialogOTP from "./otp-dialog";

const formSchema = z.object({
    email: z
        .string()
        .nonempty("Email là bắt buộc")
        .email("Định dạng email không hợp lệ"),
    password: z
        .string()
        .nonempty("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    remember: z
        .boolean()
        .optional(),
});

export type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
    heading?: string;
    subheading?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
    };
    loginText?: string;
    googleText?: string;
    signupText?: string;
    signupUrl?: string;
    // Optional callbacks for handling login
    onSubmit?: (data: LoginFormValues) => Promise<void>;
    isSubmitting?: boolean;
    error?: string | null;
}

export default function LoginForm({
                                      heading = "VN Academy",
                                      subheading = "Đăng nhập ngay để trải nghiệm",
                                      logo = {
                                          url: "https://localhost:3000",
                                          src: "https://www.shadcnblocks.com/images/block/block-1.svg",
                                          alt: "logo",
                                      },
                                      loginText = "Đăng nhập",
                                      googleText = "Đăng nhập bằng Google",
                                      signupText = "Chưa có tài khoản?",
                                      signupUrl = "/register",
                                      onSubmit,
                                      isSubmitting = false,
                                      error = null,
                                  }: LoginFormProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    async function handleFormSubmit(data: LoginFormValues) {
        if (onSubmit) {
            await onSubmit(data);
        }
    }

    return (
        <section className="py-9 ">
            <div className="container ">
                <div className="flex flex-col gap-14 ">
                    <div className="mx-auto w-full rounded-[10px] p-6 shadow-2xl bg-white">
                        <div className="mb-6 flex flex-col items-center">
                            <a href={logo.url}>
                                <img src={logo.src} alt={logo.alt} className="mb-7 h-10 w-auto"/>
                            </a>
                            <p className="mb-2 text-2xl font-bold">{heading}</p>
                            <p className="text-muted-foreground">{subheading}</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="grid gap-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label>Email</Label>
                                            <FormControl>
                                                <Input 
                                                    type="email"
                                                    placeholder="Nhập email của bạn"
                                                    iconLeft={<FaUserShield/>} 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label>Mật khẩu</Label>
                                            <FormControl>
                                                <Input
                                                    type="password" 
                                                    placeholder="Nhập mật khẩu của bạn"
                                                    iconLeft={<IoMdLock/>} 
                                                    passwordEye={true} 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <FormField
                                        control={form.control}
                                        name="remember"
                                        render={({field}) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox 
                                                        id="remember" 
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <Label className="-translate-y-[3px]" htmlFor="remember">Ghi nhớ</Label>
                                            </FormItem>
                                        )}
                                    />
                                    <a className="text-sm text-primary hover:underline hover:cursor-pointer"
                                       onClick={() => setDialogOpen(true)}>
                                        Quên mật khẩu
                                    </a>
                                    <DialogOTP open={dialogOpen} onClose={() => setDialogOpen(false)}/>
                                </div>
                                <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Đang đăng nhập..." : loginText}
                                </Button>
                                <div
                                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-gray-500">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Hoặc sử dụng tài khoản liên kết
                                    </span>
                                </div>
                                <Button type="button" variant="outline" className="w-full border-gray-400"
                                        disabled={isSubmitting}>
                                    <FcGoogle className="mr-2 size-5"/>
                                    {googleText}
                                </Button>
                            </form>
                        </Form>
                        <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                            <p>{signupText}</p>
                            <a href={signupUrl} className="font-medium text-primary hover:underline">
                                Đăng ký ngay
                            </a>
                        </div>
                    </div>
                    <div
                        className="w-full text-center text-muted-foreground text-xs mt-2 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </section>
    );
}