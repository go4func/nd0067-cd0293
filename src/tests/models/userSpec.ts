import { UserStore } from '../../models/user';

const store = new UserStore();

describe('Model: User', () => {
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
  });
});
