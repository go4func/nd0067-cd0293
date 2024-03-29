import type { Product } from '../../models/product';
import type { User } from '../../models/user';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Handler: orders', () => {
  const product: Product = {
    name: 'Macbook Pro',
    category: 'laptop',
  };
  const user: User = {
    first_name: 'fist_name',
    last_name: 'last_name',
    password: 'password',
  };

  describe('POST /orders', () => {
    it('should response with status 200', async () => {
      await request.post('/users').send(user).expect(200);
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .post('/orders')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send({})
        .expect(200);
    });
  });

  describe('PUT /orders/:id/products', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .post('/products')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(product)
        .expect(200);
      await request
        .put('/orders/1/products')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send({
          product_id: 1,
          quantity: 5,
        })
        .expect(200);
    });
  });

  describe('GET /orders/active', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .get('/orders/active')
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(200);
    });
  });

  describe('PUT /orders', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .put('/orders')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send({
          id: 1,
          status: 'complete',
        })
        .expect(200);
    });
  });

  describe('GET /orders/complete', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .get('/orders/complete')
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(200);
    });
  });
});
