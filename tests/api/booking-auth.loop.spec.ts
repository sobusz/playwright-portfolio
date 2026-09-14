import { test, expect } from '../fixtures/portfolio-fixtures';
import { buildBookingPayload } from '../data/factories/booking-factory';
import { bookingSchema } from '../utils/restful-booker.schemas';
import { restfulBookerBaseURL } from '../utils/restful-booker';

const negatives = [
  { name: 'no cookie', headers: {} as Record<string, string> },
  { name: 'garbage token', headers: { Cookie: 'token=not-a-session' } },
];

test.describe('Booking auth @api @loop', () => {
  // Review: one expected 403 is too tight and misses a garbage cookie.
  for (const row of negatives) {
    test(`update rejected: ${row.name}`, async ({ request, bookingApi }) => {
      const created = await bookingApi.client.createBooking(buildBookingPayload());
      bookingApi.track(created.bookingid);

      const response = await request.put(`${restfulBookerBaseURL}/booking/${created.bookingid}`, {
        data: buildBookingPayload({ firstname: 'Hijack' }),
        headers: row.headers,
      });

      await test.info().attach(`update-${row.name}-status`, {
        body: String(response.status()),
        contentType: 'text/plain',
      });
      expect([401, 403]).toContain(response.status());
    });
  }

  test('update with a real token still matches the contract', async ({ bookingApi }) => {
    const created = await bookingApi.client.createBooking(buildBookingPayload());
    bookingApi.track(created.bookingid);
    const next = buildBookingPayload({ firstname: 'Kept' });
    const updated = await bookingApi.client.updateBooking(
      created.bookingid,
      bookingApi.token,
      next,
    );
    bookingSchema.parse(updated);
    expect(updated.firstname).toBe('Kept');
  });
});
