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
import { Dog, Event } from "@prisma/client";
import { format } from "date-fns";
import { Session } from "next-auth";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import eventRegistrationFormSchema from "../_schemas/eventRegistrationFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import registerEvent from "../actions/registerEvent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { protectedRoutes } from "@/routes/routes";

type EventRegistrationFormProps = {
  dogs: Dog[];
  event: Event;
  session: Session;
};

const EventRegistrationForm = ({
  dogs,
  event,
  session,
}: EventRegistrationFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof eventRegistrationFormSchema>>({
    resolver: zodResolver(eventRegistrationFormSchema),
    defaultValues: {
      dogId: "",
    },
  });

  function onSubmit(
    values: z.infer<typeof eventRegistrationFormSchema>
  ) {
    startTransition(() => {
      registerEvent({
        ...values,
        userId: session.user.id,
        eventId: event.id,
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else if (data.success) {
          toast.success(data.success);
          router.push(protectedRoutes.myEvents);
        }
      });
    });
  }

  console.log(event.id, session.user.id);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px]"
        >
          <FormItem>
            <FormLabel>Имя</FormLabel>
            <FormControl>
              <Input
                placeholder="Имя"
                disabled
                value={session?.user.firstName || ""}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Фамилия</FormLabel>
            <FormControl>
              <Input
                placeholder="Фамилия"
                disabled
                value={session?.user.lastName || ""}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Дата Рождения</FormLabel>
            <FormControl>
              <Input
                placeholder="Дата Рождения"
                disabled
                value={format(
                  session?.user.dateOfBirth || "",
                  "dd/MM/yyyy"
                )}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Пол</FormLabel>
            <FormControl>
              <Input
                placeholder="Пол"
                disabled
                value={session?.user.sex || ""}
              />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="dogId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Напарник" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dogs.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EventRegistrationForm;
