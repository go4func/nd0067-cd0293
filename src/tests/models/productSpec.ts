import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Model: Product', () => {
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
  });
});
