import { z } from "zod";

export const authenticateUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type AuthenticateUserSchema = z.infer<typeof authenticateUserSchema>;
