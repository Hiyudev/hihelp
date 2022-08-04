import { z } from "zod";

export const RecoverFormValidation = z.object({
  email: z.string().email({ message: "E-mail não é válido" }),
});
