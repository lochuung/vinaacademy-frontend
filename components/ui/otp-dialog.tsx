"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";


interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
}

export default function DialogOTP({ open, onClose }: DialogComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[430px] gap-8 py-8">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Vui lòng nhập username hoặc email để lấy mật khẩu mới
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-1 ">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Tài khoản
            </Label>
            <Input id="username" placeholder="Username hoặc email" className="col-span-3 border-gray-300 " />
          </div>
          <div className="flex flex-col gap-2 border-gray-300">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn cách xác minh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="username">Username</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <div className="flex justify-center items-center" >
          <DialogFooter >
            <DialogClose asChild>
              <Button className="" type="submit">Khôi phục</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>

  );
}
