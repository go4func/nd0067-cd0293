import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Test auth routes', () => {
  describe('GET /login', () => {
    it('should response with status 400', async () => {
      const response = await request.post('/login');
      expect(response.status).toBe(400);
      expect(response.text).toEqual('"invalid request body"');
    });
  });
});
