import { test, expect } from '../fixtures/portfolio-fixtures';

test.describe('Booking auth @api @loop', () => {
  test('update without a token is forbidden', async ({ request, bookingApi }) => {
    const created = await bookingApi.client.createBooking({
      firstname: 'Auth',
      lastname: 'Case',
      totalprice: 50,
      depositpaid: true,
      bookingdates: { checkin: '2026-10-01', checkout: '2026-10-08' },
    });
    bookingApi.track(created.bookingid);

    const response = await request.put(
      `https://restful-booker.herokuapp.com/booking/${created.bookingid}`,
      {
        data: {
          firstname: 'Hijack',
          lastname: 'Case',
          totalprice: 50,
          depositpaid: true,
          bookingdates: { checkin: '2026-10-01', checkout: '2026-10-08' },
        },
      },
    );

    expect(response.status()).toBe(403);
  });
});
