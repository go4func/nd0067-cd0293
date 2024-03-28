import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Test products routes', () => {
  describe('GET /products', () => {
    it('should response with status 200', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /products?category=laptop', () => {
    it('should response with status 200', async () => {
      const response = await request.get('/products?category=laptop');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /products/:id', () => {
    it('should response with status 200', async () => {
      const response = await request.get('/products/0');
      expect(response.status).toBe(200);
    });
  });
  describe('POST /products', () => {
    it('should response with status 401', async () => {
      const response = await request.post('/products').send({});
      expect(response.status).toBe(401);
      expect(response.text).toEqual('"token is required"');
    });
  });
});
