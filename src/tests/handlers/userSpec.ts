import type { User } from '../../models/user';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Handler: users', () => {
  const user: User = {
    first_name: 'fist_name',
    last_name: 'last_name',
    password: 'password',
  };

  describe('POST /users', () => {
    it('should response with status 200', async () => {
      await request.post('/users').send(user).expect(200);
    });
  });

  describe('GET /users', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .get('/users')
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(200);
    });
  });

  describe('GET /users/:id', () => {
    it('should response with status 200', async () => {
      const response = await request
        .post('/login')
        .send({ id: 1, password: user.password });
      await request
        .get('/users/1')
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(200);
    });
  });
});
