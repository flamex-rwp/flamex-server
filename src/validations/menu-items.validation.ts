// validations/menu-items.validation.ts
import { z } from 'zod';

export const createMenuItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional().or(z.literal('')),
    price: z.number().min(0),
    categoryId: z.number().int().positive().optional().nullable(),
    imageUrl: z.string()
      .optional()
      .or(z.literal(''))
      .refine((val) => {
        // If empty string or undefined, it's valid (optional field)
        if (!val || val === '') return true;
        // Must be a valid URL
        try {
          const url = new URL(val);
          // Must be http or https protocol
          return ['http:', 'https:'].includes(url.protocol);
        } catch {
          return false;
        }
      }, {
        message: 'Image URL must be a valid URL starting with http:// or https://'
      }),
    available: z.boolean().optional().default(true),
  }),
});

export const updateMenuItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional().or(z.literal('')),
    price: z.number().min(0).optional(),
    categoryId: z.number().int().positive().optional().nullable(),
    imageUrl: z.string()
      .optional()
      .or(z.literal(''))
      .refine((val) => {
        // If empty string or undefined, it's valid (optional field)
        if (!val || val === '') return true;
        // Must be a valid URL
        try {
          const url = new URL(val);
          // Must be http or https protocol
          return ['http:', 'https:'].includes(url.protocol);
        } catch {
          return false;
        }
      }, {
        message: 'Image URL must be a valid URL starting with http:// or https://'
      }),
    available: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});