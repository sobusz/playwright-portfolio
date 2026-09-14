import { test, expect } from '../fixtures/portfolio-fixtures';
import { buildBookingPayload } from '../data/factories/booking-factory';
import { bookingSchema } from '../utils/restful-booker.schemas';

test.describe('Booking property @api @loop', () => {
  // Review: one John payload is luck. Random stays must all parse.
  test('random factory bookings match the stay contract', async ({ bookingApi }) => {
    for (let i = 0; i < 8; i++) {
      const payload = buildBookingPayload();
      const created = await bookingApi.client.createBooking(payload);
      bookingApi.track(created.bookingid);
      const stored = await bookingApi.client.getBooking(created.bookingid);
      const parsed = bookingSchema.safeParse(stored);
      if (!parsed.success) {
        await test.info().attach(`payload-${i}.json`, {
          body: JSON.stringify({ payload, stored, issues: parsed.error.issues }, null, 2),
          contentType: 'application/json',
        });
      }
      expect(parsed.success, `iteration ${i} failed the contract`).toBe(true);
      if (!parsed.success) continue;
      expect(parsed.data.bookingdates.checkout > parsed.data.bookingdates.checkin).toBe(true);
    }
  });
});
