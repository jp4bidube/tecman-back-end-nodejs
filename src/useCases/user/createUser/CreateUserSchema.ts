import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  employeeId: z.number(),
  role: z
    .number()
    .min(1, { message: "Perfil inválido" })
    .max(4, { message: "Perfil inválido" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
