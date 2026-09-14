import { test, expect } from '../fixtures/portfolio-fixtures';
import { buildBookingPayload } from '../data/factories/booking-factory';
import { restfulBookerBaseURL } from '../utils/restful-booker';

test.describe('Booking lifecycle @api @loop', () => {
  // Review: a 201 on DELETE is not the risk. The booking must be unreadable after.
  test('GET is 404 after a successful delete', async ({ request, bookingApi }) => {
    const created = await bookingApi.client.createBooking(buildBookingPayload());
    const id = created.bookingid;

    await bookingApi.client.deleteBooking(id, bookingApi.token);

    const after = await request.get(`${restfulBookerBaseURL}/booking/${id}`);
    await test.info().attach('get-after-delete-status', {
      body: String(after.status()),
      contentType: 'text/plain',
    });
    expect(after.status()).toBe(404);
  });
});
