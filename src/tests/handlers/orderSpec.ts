import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Handler: orders', () => {
  describe('GET /orders/active', () => {
    it('should response with status 401', async () => {
      const response = await request.get('/orders/active');
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
  describe('GET /orders/complete', () => {
    it('should response with status 401', async () => {
      const response = await request.get('/orders/complete');
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
  describe('POST /orders', () => {
    it('should response with status 401', async () => {
      const response = await request.post('/orders').send({});
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
});
