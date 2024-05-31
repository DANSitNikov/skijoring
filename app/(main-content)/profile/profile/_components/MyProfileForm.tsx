"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Session } from "next-auth";
import myProfileFormSchema from "../schemas/myProfileFormSchema";
import updateProfile from "../_actions/updateProfile";
import { toast } from "sonner";

const MyProfileForm = ({ session }: { session: Session | null }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof myProfileFormSchema>>({
    resolver: zodResolver(myProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      sex: "Мужской",
    },
  });

  function onSubmit(values: z.infer<typeof myProfileFormSchema>) {
    startTransition(() => {
      updateProfile(values).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else if (data.success) {
          toast.success(data.success);
        }
      });
    });
  }

  useEffect(() => {
    if (session && session?.user) {
      // @ts-ignore
      form.reset({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        dateOfBirth: new Date(session.user.dateOfBirth || ""),
        sex: session.user.sex || "",
      });
    }
  }, [form, session]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px]"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Email"
                disabled
                value={session?.user.email || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Имя"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Фамилия"
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата Рождения</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isPending}
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Дата Рождения</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Пол</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Мужской" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Мужской
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Женский" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Женский
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Сохранить
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MyProfileForm;
