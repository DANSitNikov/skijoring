import { z } from "zod";

const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "Имя обязательно" }),
  lastName: z.string().min(1, { message: "Фамилия обязателна" }),
  email: z
    .string()
    .min(1, { message: "Email обязателен" })
    .email({ message: "Неправильный формат email" }),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .regex(/^\S*$/, { message: "Пробелы не разрешены" })
    .min(6, "Пароль должен содержать минимум 6 символов"),
  dateOfBirth: z.date({
    required_error: "Дата Рождения обязательна",
  }),
  sex: z.enum(["Мужской", "Женский"], {
    required_error: "Пол обязателен",
  }),
});

export default signUpFormSchema;
