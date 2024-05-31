import { z } from "zod";

const editEventFormSchema = z
  .object({
    title: z.string().min(1, { message: "Заголовок обязателен" }),
    description: z
      .string()
      .min(1, { message: "Описание обязательно" }),
    startDate: z.date({
      required_error: "Дата Начала",
    }),
    endDate: z.date({
      required_error: "Дата Окончания",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Неправильно Выбрана Дата",
    path: ["endDate"],
  });

export default editEventFormSchema;
