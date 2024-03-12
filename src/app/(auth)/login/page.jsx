"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const [user, setUser] = useState({ password: "", email: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const form = useForm();

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      router.push("/");
    } catch (error) {
      console.log("Login Failed: ", error.message);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="flex gap-y-5 flex-col mt-20 ml-20"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your Email"
                  {...field}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  type="email"
                  className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-red-500 invalid:text-red-600
                  focus:border-none focus:invalid:ring-red-500 w-64 rounded-full"
                />
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
              <FormControl>
                <Input
                  placeholder="Enter your Password"
                  {...field}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  type="password"
                  className="w-64 rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={`rounded-full w-44`}>
          Login
        </Button>
      </form>
    </Form>
  );
}
