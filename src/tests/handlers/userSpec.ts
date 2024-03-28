import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Test users routes', () => {
  describe('GET /users', () => {
    it('should response with status 401', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
  describe('GET /users/:id', () => {
    it('should response with status 401', async () => {
      const response = await request.get('/users/1');
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
  describe('POST /users', () => {
    it('should response with status 400', async () => {
      const response = await request.post('/users').send({});
      expect(response.status).toBe(400);
      expect(response.text).toEqual('"invalid request body"');
    });
  });
});
