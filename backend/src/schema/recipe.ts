import { z } from 'zod';

export const CreateRecipeSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, 'Name too short. Must be more than 1 char.')
    .max(25, 'Name too long. Must be shorter than 25 chars.'),
  description: z.string({ required_error: 'Description is required' }),
  method: z.array(z.string(), { required_error: 'Method required' }),
  ingredients: z.array(z.string(), { required_error: 'Ingredients required' }),
});
