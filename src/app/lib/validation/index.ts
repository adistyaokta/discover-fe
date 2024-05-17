import * as z from 'zod';

export const SignupValidation = z.object({
  username: z.string().min(5, { message: 'Username cannot be less than 5 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  email: z.string().email()
});

export const LoginValidation = z.object({
  username: z.string().min(5, { message: 'Username cannot be less than 5 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});
