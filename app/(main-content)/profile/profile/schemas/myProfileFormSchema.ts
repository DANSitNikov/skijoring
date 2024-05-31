import { z } from "zod";

const myProfileFormSchema = z.object({
  firstName: z.string().min(1, { message: "Имя обязательно" }),
  lastName: z.string().min(1, { message: "Фамилия обязателна" }),
  dateOfBirth: z.date({
    required_error: "Дата Рождения обязательна",
  }),
  sex: z.enum(["Мужской", "Женский"], {
    required_error: "Пол обязателен",
  }),
});

export default myProfileFormSchema;
