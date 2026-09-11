import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { z } from 'zod';
import {
  authTokenSchema,
  bookingSchema,
  createdBookingSchema,
  type BookingPayload,
  type CreateBookingResponse,
} from './restful-booker.schemas';

export type { BookingPayload, CreateBookingResponse };

export const restfulBookerBaseURL = 'https://restful-booker.herokuapp.com';

export class RestfulBookerClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string = restfulBookerBaseURL) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createToken(): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    const body = await this.readJson(authTokenSchema, response, 'Auth');
    return body.token;
  }

  async createBooking(payload: BookingPayload): Promise<CreateBookingResponse> {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
    });

    return this.readJson(createdBookingSchema, response, 'Create booking');
  }

  async getBooking(bookingId: number): Promise<BookingPayload> {
    const response = await this.request.get(`${this.baseUrl}/booking/${bookingId}`);
    return this.readJson(bookingSchema, response, 'Get booking');
  }

  async updateBooking(
    bookingId: number,
    token: string,
    payload: BookingPayload,
  ): Promise<BookingPayload> {
    const response = await this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    return this.readJson(bookingSchema, response, 'Update booking');
  }

  async deleteBooking(bookingId: number, token: string): Promise<void> {
    const response = await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Delete booking failed: ${response.status()} ${response.statusText()}`);
    }
  }

  private async readJson<T>(
    schema: z.ZodType<T>,
    response: APIResponse,
    context: string,
  ): Promise<T> {
    if (!response.ok()) {
      throw new Error(`${context} failed: ${response.status()} ${response.statusText()}`);
    }

    return schema.parse(await response.json());
  }
}
