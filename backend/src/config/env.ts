import 'dotenv/config';
import { z } from 'zod';

// Type Safe Environment Variables
const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  MONGO_URI: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  CRYPTO_SECRET: z.string().trim().min(1),
  ORIGIN: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
