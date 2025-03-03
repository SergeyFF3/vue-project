import { z } from "zod";

export const validationSchema = z.object({
  mark: z.string().max(100, "Максимум 100 символов"),
  login: z
    .string()
    .min(1, "Обязательное поле")
    .max(50, "Максимум 100 символов"),
  password: z
    .string()
    .min(1, "Обязательное поле")
    .max(100, "Максимум 100 символов")
    .nullable(),
});
