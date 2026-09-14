import { test, expect } from '../fixtures/portfolio-fixtures';
import { bookingSchema } from '../utils/restful-booker.schemas';
import { restfulBookerBaseURL } from '../utils/restful-booker';

test.describe('Restful Booker dates @api', () => {
  test('rejects inverted stay dates on the contract even if the API stores them', async ({
    request,
    bookingApi,
  }) => {
    const create = await request.post(`${restfulBookerBaseURL}/booking`, {
      data: {
        firstname: 'Contract',
        lastname: 'Check',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-18',
        },
        additionalneeds: 'Breakfast',
      },
    });

    expect(create.ok(), `create should succeed at HTTP layer, got ${create.status()}`).toBeTruthy();
    const created = (await create.json()) as { bookingid: number };
    bookingApi.track(created.bookingid);

    await expect(bookingApi.client.getBooking(created.bookingid)).rejects.toThrow();

    const raw = await request.get(`${restfulBookerBaseURL}/booking/${created.bookingid}`);
    const parsed = bookingSchema.safeParse(await raw.json());

    expect(parsed.success).toBe(false);
    if (parsed.success) return;
    expect(parsed.error.issues.some((issue) => issue.path.includes('checkout'))).toBe(true);
  });
});
