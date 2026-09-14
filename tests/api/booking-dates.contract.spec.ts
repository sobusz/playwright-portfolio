import { test, expect } from '../fixtures/portfolio-fixtures';

test.describe('Restful Booker dates @api', () => {
  test('creates a booking even when checkout is before checkin', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-18',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.booking.firstname).toBe('John');
  });
});
