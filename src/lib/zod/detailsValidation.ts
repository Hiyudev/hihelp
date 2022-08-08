import { z } from "zod";

export const DetailsFormValidation = z.object({
  solution: z.string().min(2, { message: "A solução deve conter ao menos 2 carateres para ser encerrado." }),
});
