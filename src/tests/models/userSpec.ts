import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('Model: User', () => {
  describe('method create', () => {
    it('should have an create method', async () => {
      expect(store.create).toBeDefined;
    });
    it('should return a created user', async () => {
      const user: User = {
        first_name: 'fist_name',
        last_name: 'last_name',
        password: 'password',
      };
      const result: User = await store.create(user);
      expect(result.id).toBeDefined;
      expect(result.first_name).toEqual(user.first_name);
      expect(result.last_name).toEqual(user.last_name);
    });
  });
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
    it('should return a list of users', async () => {
      const result = await store.index();
      expect(result.length).not.toEqual(0);
    });
  });
  describe('method show', () => {
    it('should have an show method', async () => {
      expect(store.show).toBeDefined;
    });
    it('should return user info', async () => {
      const result: User = await store.show(1);
      expect(result.id).toEqual(1);
    });
  });
});
