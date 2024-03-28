import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Test dashboards routes', () => {
  describe('GET /five-most-popular', () => {
    it('should response with status 200', async () => {
      const response = await request.get('/five-most-popular');
      expect(response.status).toBe(200);
    });
  });
});
