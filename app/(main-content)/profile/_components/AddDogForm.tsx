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
import addDogFormSchema from "../_schemas/addDogFormSchema";
import addDog from "../_actions/addDog";

const AddDogForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addDogFormSchema>>({
    resolver: zodResolver(addDogFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof addDogFormSchema>
  ) => {
    startTransition(() => {
      addDog(values).then((data) => {
        console.log(data.error);
        console.log(data.success);
      });
    });
  };

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
                <Input placeholder="Кличка" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Добавить
        </Button>
      </form>
    </Form>
  );
};

export default AddDogForm;
