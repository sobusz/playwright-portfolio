import { test, expect } from '../fixtures/portfolio-fixtures';
import { buildBookingPayload } from '../data/factories/booking-factory';
import { restfulBookerBaseURL } from '../utils/restful-booker';
import { bookingSchema } from '../utils/restful-booker.schemas';

test.describe('Restful Booker API @api @smoke', () => {
  test('creates, updates, and deletes a booking', async ({ bookingApi }) => {
    const createPayload = buildBookingPayload();
    const updatePayload = buildBookingPayload({ firstname: 'Updated', lastname: 'Booking' });
    let bookingId: number | null = null;

    await test.step('Create booking', async () => {
      await test.info().attach('create-payload.json', {
        body: JSON.stringify(createPayload, null, 2),
        contentType: 'application/json',
      });

      const created = await bookingApi.client.createBooking(createPayload);
      bookingId = created.bookingid;
      bookingApi.track(created.bookingid);

      await test.info().attach('create-response.json', {
        body: JSON.stringify(created, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Get booking', async () => {
      if (!bookingId) throw new Error('Booking id was not created.');

      const booking = await bookingApi.client.getBooking(bookingId);
      bookingSchema.parse(booking);

      expect(booking.firstname).toBe(createPayload.firstname);
      expect(booking.lastname).toBe(createPayload.lastname);

      await test.info().attach('get-response.json', {
        body: JSON.stringify(booking, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Update booking', async () => {
      if (!bookingId) throw new Error('Booking id was not created.');

      await test.info().attach('update-payload.json', {
        body: JSON.stringify(updatePayload, null, 2),
        contentType: 'application/json',
      });

      const updated = await bookingApi.client.updateBooking(
        bookingId,
        bookingApi.token,
        updatePayload,
      );

      expect(updated.firstname).toBe(updatePayload.firstname);
      expect(updated.totalprice).toBe(updatePayload.totalprice);

      await test.info().attach('update-response.json', {
        body: JSON.stringify(updated, null, 2),
        contentType: 'application/json',
      });
    });
  });

  test('rejects update without auth token', async ({ request, bookingApi }) => {
    const created = await bookingApi.client.createBooking(buildBookingPayload());
    bookingApi.track(created.bookingid);

    const response = await request.put(`${restfulBookerBaseURL}/booking/${created.bookingid}`, {
      data: buildBookingPayload({ firstname: 'NoAuth' }),
    });

    expect([401, 403]).toContain(response.status());
  });

  test('rejects invalid booking payload', async ({ request }) => {
    const response = await request.post(`${restfulBookerBaseURL}/booking`, {
      data: { firstname: 'OnlyName' },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
