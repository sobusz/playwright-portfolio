import { test as base } from '@playwright/test';
import { RestfulBookerClient } from '../utils/restful-booker';

export type SiteUrls = {
  automationExercise: string;
  theInternet: string;
  restfulBooker: string;
};

export type BookingApi = {
  client: RestfulBookerClient;
  token: string;
  track: (bookingId: number) => void;
};

export const test = base.extend<{ siteUrls: SiteUrls; bookingApi: BookingApi }>({
  // Playwright requires object destructuring; this fixture has no deps.
  // eslint-disable-next-line no-empty-pattern -- fixture signature
  siteUrls: async ({}, use) => {
    await use({
      automationExercise: 'https://automationexercise.com',
      theInternet: 'https://the-internet.herokuapp.com',
      restfulBooker: 'https://restful-booker.herokuapp.com',
    });
  },

  bookingApi: async ({ request }, use) => {
    const client = new RestfulBookerClient(request);
    const token = await client.createToken();
    const createdIds: number[] = [];

    await use({
      client,
      token,
      track: (bookingId) => createdIds.push(bookingId),
    });

    await Promise.allSettled(createdIds.map((id) => client.deleteBooking(id, token)));
  },
});

export { expect } from '@playwright/test';
