import type { User } from '../../models/user';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
describe('Handlers: auth', () => {
  const user: User = {
    first_name: 'fist_name',
    last_name: 'last_name',
    password: 'password',
  };

  describe('POST /login', () => {
    it('should response with status 200', async () => {
      await request.post('/users').send(user).expect(200);
      await request
        .post('/login')
        .send({ id: 1, password: user.password })
        .expect(200);
    });
  });
});
