"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosInstance";
import { useEffect, useRef } from "react";

interface LoginDetails {
  email: string;
  password: string;
}

export default function LoginForm() {
    const ref = useRef(null);

  const router = useRouter();
  const {
    register: userRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
        console.log(1111);

      ref.current.click();
    }, 2000); //miliseconds
  }, []);
  
  const onSubmit = async ({ email, password }: LoginDetails) => {
    try {
    console.log(313123);
      await axios.post("/api/auth/login", {
        email,
        password,
      });

      router.push("/admin-chat");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 hidden">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...userRegister("email", { required: true })}
          placeholder="m@example.com"
          type="email"
          value="nhatnhat@gmail.com"
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...userRegister("password", { required: true })}
          type="password"
          value="nhatphu90"

        />
        {errors.password && <p>Password is required</p>}
      </div>
      <Button ref={ref} className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
}
