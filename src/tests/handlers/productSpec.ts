import type { Product } from '../../models/product';
import type { User } from '../../models/user';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Handler: products', () => {
  const product: Product = {
    name: 'Macbook Pro',
    category: 'laptop',
  };
  const user: User = {
    first_name: 'fist_name',
    last_name: 'last_name',
    password: 'password',
  };

  describe('POST /products', () => {
    it('should response with status 200', async () => {
      await request.post('/users').send(user).expect(200);
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .post('/products')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(product)
        .expect(200);
    });
  });

  describe('GET /products', () => {
    it('should response with status 200', async () => {
      await request.get('/products').expect(200);
    });
  });

  describe('GET /products?category=laptop', () => {
    it('should response with status 200', async () => {
      await request.get('/products?category=laptop').expect(200);
    });
  });

  describe('GET /products/:id', () => {
    it('should response with status 200', async () => {
      request.get('/products/1').expect(200);
    });
  });
});
