import { z } from "zod";

export const RegisterFormValidation = z.object({
  patrimony: z.string().min(2, { message: "O patrimônio deve conter ao menos 2 carateres" }),
  description: z.string().min(2, { message: "A descrição deve conter ao menos 2 carateres" }),
});
