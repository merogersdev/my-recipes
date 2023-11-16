import { object, string, TypeOf } from 'zod';

export const CreateUserInputSchema = object({
  firstName: string({
    required_error: 'First Name is required',
  }),
  lastName: string({
    required_error: 'Last Name is required',
  }),
  password: string({
    required_error: 'Password is required',
  }).min(8, 'Password too short - should be 8 chars minimum'),
  email: string({
    required_error: 'Email is required',
  }).email('Not a valid email'),
});

export type CreateUserInputType = TypeOf<typeof CreateUserInputSchema>;
