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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signInFormSchema from "../_schemas/signInSchema";
import signIn from "../_actions/signIn";

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof signInFormSchema>
  ) => {
    startTransition(() => {
      signIn(values).then((data) => {
        console.log(data?.error);
        // console.log(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-[500px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  {...field}
                  disabled={isPending}
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Пароль"
                  type="password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Войти
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
