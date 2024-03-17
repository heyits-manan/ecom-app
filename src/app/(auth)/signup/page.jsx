"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import UserContext from "@/context/UserContext";
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

export default function SignupPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const form = useForm();
  const [buttonClicked, setButtonClicked] = useState(false);
  const { setLoggedUser } = useContext(UserContext);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      setButtonClicked(true);
      setLoggedUser(user.firstName);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.firstName.length > 0 &&
      user.lastName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
    } else {
    }
  }, [user]);
  return (
    <Form {...form} className="ml-28">
      <form
        onSubmit={form.handleSubmit(onSignup)}
        className="flex gap-y-5 flex-col mt-20 ml-10 md:ml-32 lg:ml-52 justify-center items-center w-[75vw]  h-[75vh] md:h-[75vh] bg-white rounded-lg shadow-lg shadow-orange-300 p-10"
      >
        <h1 className="font-bold md:text-4xl text-sm">Create an account</h1>
        <FormDescription className="mb-6">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500 hover:underline ">
            Login
          </Link>
        </FormDescription>
        <div className="flex gap-x-5 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    value={user.firstName}
                    type="text"
                    className="rounded-lg w-36"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    value={user.lastName}
                    type="text"
                    className="rounded-lg w-36"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                focus:border-none focus:invalid:ring-red-500 w-80 rounded-lg"
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
                  className="w-80 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          onClick={onSignup}
          className={`rounded-full w-80 ${buttonClicked ? "hidden" : "block"}`}
        >
          Signup
        </Button>
        <Button
          className={`w-44 rounded-full ${buttonClicked ? "block" : "hidden"}`}
          disabled
        >
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </form>
    </Form>
  );
}
