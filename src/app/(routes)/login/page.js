"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function Login() {
  const form = useForm();
  const onSubmit = () => {};
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Login to your account
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* {showErrMsg && (
                <p className="font-medium text-red-500">
                  Email or password is incorrect.
                </p>
              )} */}

              <Button type="submit" className="text-white">
                Login
              </Button>
            </form>
          </Form>
          <Link
            href="/forget-passward"
            className="dark:text-primary-500 block text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <p className="text-md font-semibold text-gray-700 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/signup"
              className="dark:text-primary-500 font-bold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
