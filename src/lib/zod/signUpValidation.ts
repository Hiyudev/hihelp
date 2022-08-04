import { z } from "zod";

export const SignUpFormValidation = z.object({
  email: z.string().email({ message: "E-mail não é válido" }),
  password: z.string().min(6, { message: "Por favor insira uma senha contendo mais de 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Por favor insira uma senha contendo mais de 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não conferem. Verifique novamente se as senhas foram digitadas de forma correta."
});
