// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { initialProducts, initialCoupons } from "./mockData";

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(initialProducts);
  }),
  http.get('/api/coupons', () => {
    return HttpResponse.json(initialCoupons);
  }),
];