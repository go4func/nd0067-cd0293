import type { Order } from '../../models/order';
import { OrderStore } from '../../models/order';
import type { User } from '../../models/user';
import { UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();

describe('Model: Order', () => {
  describe('method create', () => {
    it('should have an create method', async () => {
      expect(store.create).toBeDefined;
    });
    it('should return created order', async () => {
      const user: User = {
        first_name: 'fist_name',
        last_name: 'last_name',
        password: 'password',
      };
      await userStore.create(user);

      const order: Order = {
        user_id: 1,
        status: 'active',
      };
      const result: Order = await store.create(order);

      expect(result.id).toBeDefined;
      expect(result.user_id).toEqual(order.user_id);
      expect(result.status).toEqual(order.status);
    });
  });
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
    it('should return list of orders', async () => {
      const result = await store.index();
      expect(result.length).not.toEqual(0);
    });
  });
  describe('method show', () => {
    it('should have an show method', async () => {
      expect(store.show).toBeDefined;
    });
    it('should return order info', async () => {
      const result: Order = await store.show(1);
      expect(result.id).toEqual(1);
    });
  });
  describe('method getUserOrdersByStatus', () => {
    it('should have an getUserOrdersByStatus method', async () => {
      expect(store.getUserOrdersByStatus).toBeDefined;
    });
    it('should return list of active orders', async () => {
      const result = await store.getUserOrdersByStatus(1, 'active');
      expect(result.length).not.toEqual(0);
    });
  });
  describe('method update', () => {
    it('should have an update method', async () => {
      expect(store.update).toBeDefined;
    });
    it('should update order', async () => {
      const order: Order = {
        id: 1,
        user_id: 1,
        status: 'complete',
      };
      const result: Order = await store.update(order);
      expect(result.id).toEqual(order.id);
      expect(result.user_id).toEqual(order.user_id);
      expect(result.status).toEqual(order.status);
    });
  });
});
