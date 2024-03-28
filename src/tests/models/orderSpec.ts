import { OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Model: Order', () => {
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
  });
});
