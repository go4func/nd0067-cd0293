import { DashboardStore } from '../../models/dashboard';

const store = new DashboardStore();

describe('Model: dashboard', () => {
  describe('method mostPopularProduct', () => {
    it('should have an mostPopularProduct method', async () => {
      expect(store.mostPopularProduct).toBeDefined;
    });
    it('should return a list of products', async () => {
      const result = await store.mostPopularProduct(5);
      expect(result).toEqual([]);
    });
  });
});
