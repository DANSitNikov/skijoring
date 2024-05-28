import { z } from "zod";

const addDogFormSchema = z.object({
  name: z.string().min(1, { message: "Кличка обязательна" }),
});

export default addDogFormSchema;
