// validations/customers.validation.ts
import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    phone: z.string()
      .min(1, 'Phone is required')
      .max(11, 'Phone number must be maximum 11 digits (e.g., 03001234567)')
      .refine((val) => {
        // Remove spaces and non-digits for validation
        const cleaned = val.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        // Pakistani phone numbers: 11 digits starting with 0, or 10 digits starting with 3
        return cleaned.length >= 10 && cleaned.length <= 11 && /^[03]/.test(cleaned);
      }, 'Phone number must be 10-11 digits and start with 0 or 3 (e.g., 03001234567)'),
    backupPhone: z.string()
      .max(11, 'Backup phone number must be maximum 11 digits')
      .optional()
      .or(z.literal(''))
      .refine((val) => {
        if (!val || val === '') return true;
        const cleaned = val.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11 && /^[03]/.test(cleaned);
      }, 'Backup phone number must be 10-11 digits and start with 0 or 3'),
    address: z.string().min(1, 'Address is required'),
    notes: z.string().optional().or(z.literal('')),
  }),
});

export const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    phone: z.string()
      .min(1)
      .max(11, 'Phone number must be maximum 11 digits (e.g., 03001234567)')
      .refine((val) => {
        if (!val) return true;
        const cleaned = val.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11 && /^[03]/.test(cleaned);
      }, 'Phone number must be 10-11 digits and start with 0 or 3 (e.g., 03001234567)')
      .optional(),
    backupPhone: z.string()
      .max(11, 'Backup phone number must be maximum 11 digits')
      .optional()
      .or(z.literal(''))
      .refine((val) => {
        if (!val || val === '') return true;
        const cleaned = val.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11 && /^[03]/.test(cleaned);
      }, 'Backup phone number must be 10-11 digits and start with 0 or 3'),
    address: z.string().min(1).optional(),
    notes: z.string().optional().or(z.literal('')),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});