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
import React, {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import editDog from "../_actions/editDog";
import getDog from "../_actions/getDog";
import { useRouter } from "next/navigation";
import deleteDog from "../_actions/deleteDog";

export const editDogFormSchema = z.object({
  name: z.string().min(1, { message: "Кличка обязательна" }),
});

type Dog = {
  id: string;
  name: string;
  userId: string;
};

const EditDogForm = ({ dogId }: any) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof editDogFormSchema>>({
    resolver: zodResolver(editDogFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof editDogFormSchema>) {
    startTransition(() => {
      editDog(dogId, values.name).then((data) => {
        // console.log(data.error);
        console.log(data.success);

        router.push("/profile/my-dogs");
      });
    });
  }

  const onDelete = useCallback(() => {
    startTransition(() => {
      deleteDog(dogId).then(() => {
        console.log("delteed");
        router.push("/profile/my-dogs");
      });
    });
  }, [dogId, router]);

  useEffect(() => {
    startTransition(() => {
      getDog(dogId).then((data) => {
        form.reset({
          // @ts-ignore
          name: data.name,
        });
      });
    });
  }, [dogId, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кличка</FormLabel>
              <FormControl>
                <Input
                  placeholder="Кличка"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Сохранить
        </Button>
      </form>
      <Button
        disabled={isPending}
        onClick={onDelete}
        className="bg-red-600 text-white mt-2 w-[500px]"
      >
        Удалить
      </Button>
    </Form>
  );
};

export default EditDogForm;
