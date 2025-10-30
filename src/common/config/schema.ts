import { z } from 'zod';

export const configSchema = z.object({
  // JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BASE_URL: z.string().url('BASE_URL must be a valid URL'),

  PORT: z
    .string()
    .default('8000')
    .transform((val) => {
      const num = Number(val);
      if (Number.isNaN(num) || num <= 0) {
        throw new Error('PORT must be a valid number');
      }
      return num;
    }),

  POSTGRES_HOST: z.string().min(1, 'POSTGRES_HOST is required'),
  POSTGRES_PORT: z
    .string()
    .default('5432')
    .transform((val) => {
      const num = Number(val);
      if (Number.isNaN(num) || num <= 0) {
        throw new Error('POSTGRES_PORT must be a valid number');
      }
      return num;
    }),
  POSTGRES_DB: z.string().min(1, 'POSTGRES_DB is required'),
  POSTGRES_USER: z.string().min(1, 'POSTGRES_USER is required'),
  POSTGRES_PASSWORD: z.string().min(1, 'POSTGRES_PASSWORD is required'),
});

export type ConfigSchema = z.infer<typeof configSchema>;
