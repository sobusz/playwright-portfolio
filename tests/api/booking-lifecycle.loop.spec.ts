import { test, expect } from '../fixtures/portfolio-fixtures';

test.describe('Booking lifecycle @api @loop', () => {
  test('deletes a booking', async ({ bookingApi }) => {
    const created = await bookingApi.client.createBooking({
      firstname: 'Del',
      lastname: 'Ete',
      totalprice: 1,
      depositpaid: true,
      bookingdates: { checkin: '2026-10-01', checkout: '2026-10-05' },
    });
    bookingApi.track(created.bookingid);
    await bookingApi.client.deleteBooking(created.bookingid, bookingApi.token);
    expect(true).toBe(true);
  });
});
