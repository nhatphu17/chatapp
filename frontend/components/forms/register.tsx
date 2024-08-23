"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axiosInstance";

export default function RegisterForm() {
  const ref = useRef(null);

  const searchParams = useSearchParams();

  let t_name = searchParams.get('name')?.toString();
  let t_email = t_name+'@gmail.com';
  let pass= t_name+'@';

  console.log(t_name);
if(t_name!=undefined){
  useEffect(() => {
    setTimeout(() => {
        console.log(1111);

      ref.current.click();
    }, 2000); //miliseconds
  }, []);
}
  const router = useRouter();
  const {
    register: userRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, email, password }) => {
    try {
      console.log(username)
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      router.push("/chat");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          {...userRegister("username", { required: true })}
          placeholder="Enter your username"
          value={t_name}
        />
        {errors.username && <p>Username is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...userRegister("email", { required: true })}
          placeholder="m@example.com"
          type="email"
          value={t_email}
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...userRegister("password", { required: true })}
          type="password"
          value={pass}
        />
        {errors.password && <p>Password is required</p>}
      </div>
      <Button ref={ref} className="w-full" type="submit">
        Register
      </Button>
    </form>
  );
}
