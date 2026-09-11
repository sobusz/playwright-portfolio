import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

export const bookingDatesSchema = z
  .object({
    checkin: isoDate,
    checkout: isoDate,
  })
  .refine((dates) => dates.checkout > dates.checkin, {
    message: 'checkout must be after checkin',
    path: ['checkout'],
  });

export const bookingSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  totalprice: z.number().int().nonnegative(),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const bookingIdSchema = z.object({
  bookingid: z.number().int().positive(),
});

export const createdBookingSchema = bookingIdSchema.extend({
  booking: bookingSchema,
});

export const authTokenSchema = z.object({
  token: z.string().min(1),
});

export type BookingPayload = z.infer<typeof bookingSchema>;
export type CreateBookingResponse = z.infer<typeof createdBookingSchema>;
