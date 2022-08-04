import { z } from "zod";

export const SignInFormValidation = z.object({
  email: z.string().email({ message: "E-mail não é válido" }),
  password: z.string().min(6, { message: "Por favor insira uma senha contendo mais de 6 caracteres" }),
});
