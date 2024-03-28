import { DashboardStore } from '../../models/dashboard';

const store = new DashboardStore();

describe('Model: dashboard', () => {
  describe('method mostPopularProduct', () => {
    it('should have an mostPopularProduct method', async () => {
      expect(store.mostPopularProduct).toBeDefined;
    });
  });
});
