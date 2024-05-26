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
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import editDog from "../_actions/editDog";
import getDog from "../_actions/getDog";

export const editDogFormSchema = z.object({
  name: z.string().min(1, { message: "Кличка обязательна" }),
});

type EditDogFormProps = {
  dog: {
    id: string;
    name: string;
    userId: string;
  };
};

const EditDogForm = ({ dog }: EditDogFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof editDogFormSchema>>({
    resolver: zodResolver(editDogFormSchema),
    defaultValues: {
      name: dog.name,
    },
  });

  function onSubmit(values: z.infer<typeof editDogFormSchema>) {
    startTransition(() => {
      editDog(dog.id, values.name).then((data) => {
        // console.log(data.error);
        console.log(data.success);
      });
    });
  }

  useEffect(() => {
    console.log("get dog use effect");
    getDog(dog.id);
  }, [dog.id]);

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
    </Form>
  );
};

export default EditDogForm;
