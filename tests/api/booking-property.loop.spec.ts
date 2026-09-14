import { test, expect } from '../fixtures/portfolio-fixtures';

test.describe('Booking property @api @loop', () => {
  test('a booking round-trip keeps the name', async ({ bookingApi }) => {
    const created = await bookingApi.client.createBooking({
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 111,
      depositpaid: true,
      bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
    });
    bookingApi.track(created.bookingid);
    const stored = await bookingApi.client.getBooking(created.bookingid);
    expect(stored.firstname).toBe('John');
  });
});
