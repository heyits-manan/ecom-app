"use client";

import { useForm } from "react-hook-form";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import UserContext from "@/context/UserContext";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({ password: "", email: "" });
  const router = useRouter();
  const form = useForm();
  const { setLoggedUser } = useContext(UserContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState(false);

  const onLogin = async () => {
    try {
      setButtonClicked(true);
      const response = await axios.post("/api/users/login", user);
      setLoggedUser(response.data.user);
      router.push("/");
    } catch (error) {
      setErrorLoginMessage(true);
      console.log("Login Failed: ", error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="flex gap-y-3 flex-col mt-40 ml-10 md:ml-32 lg:ml-[40em]  justify-center items-center  w-[35vw]  h-[75vh] md:h-[55vh] bg-white rounded-lg shadow-lg shadow-orange-300 p-10 "
      >
        <h1 className="font-bold md:text-4xl text-sm text-black">
          Log into your account
        </h1>
        <FormDescription className="mb-6 text-black">
          Not a member?{" "}
          <Link href={"/signup"} className="text-blue-500 hover:underline ">
            Signup
          </Link>
        </FormDescription>
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
                  focus:border-none focus:invalid:ring-red-500 w-64 rounded-lg"
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
                  className="w-64 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorLoginMessage == true && (
          <h1 className="text-red-500 text-xs justify-start">
            Incorrect Credentials
          </h1>
        )}
        <Button
          type="submit"
          className={`rounded-full md:w-64 bg-black ${
            buttonClicked && errorLoginMessage == false ? "hidden" : "block"
          }`}
        >
          Login
        </Button>
        <Button
          className={`w-12  rounded-full ${
            buttonClicked && errorLoginMessage == false ? "block" : "hidden"
          } items-center`}
          disabled
        >
          <ReloadIcon className="h-4 w-4 animate-spin" />
        </Button>
      </form>
    </Form>
  );
}
