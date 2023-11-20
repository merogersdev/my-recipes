import { TypeOf, z } from 'zod';
import { Types } from 'mongoose';

export const CreateUserInputSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(2, 'First Name too short'),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(2, 'Last Name too short'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password too short - should be 8 chars minimum'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
});

export const LoginInputSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password too short - should be 8 chars minimum'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
});

// Check if User ID is a valid MongoDB ObjectId
export const UserIdSchema = z.object({
  id: z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid User ID Supplied' }),
});

export type CreateUserInputType = TypeOf<typeof CreateUserInputSchema>;
export type LoginInputType = TypeOf<typeof LoginInputSchema>;
export type UserIdType = TypeOf<typeof UserIdSchema>;
