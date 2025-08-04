import { email, z } from 'zod';

export const userSchema = z.object({
  email: z.email(),
  password: z.string()
});


export const resetPasswordSchema = z.object({
  email: z.email(),
  password: z.string(),
  newPassword: z.string()
});