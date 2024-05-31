import { z } from "zod";

const eventRegistrationFormSchema = z.object({
  userId: z.string().optional(),
  eventId: z.string().optional(),
  dogId: z
    .string()
    .min(1, { message: "Пожалуйста выберите напарника" }),
});

export default eventRegistrationFormSchema;
