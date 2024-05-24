import { z } from "zod";

const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email обязателен" })
    .email({ message: "Неправильный формат email" }),
  password: z.string().min(1, { message: "Пароль обязателен" }),
});

export default signInFormSchema;
