import { DashboardStore } from '../../models/dashboard';
import { Order, OrderStore } from '../../models/order';
import { OrderProduct, OrderProductStore } from '../../models/orderProducts';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const store = new DashboardStore();
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderProductStore = new OrderProductStore();

describe('Model: dashboard', () => {
  describe('method mostPopularProduct', () => {
    it('should have an mostPopularProduct method', async () => {
      expect(store.mostPopularProduct).toBeDefined;
    });
    it('should return a list of products', async () => {
      const product: Product = {
        name: 'macbook pro 14',
        category: 'laptop',
      };
      await productStore.create(product);

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
      await orderStore.create(order);

      const orderProduct: OrderProduct = {
        order_id: 1,
        product_id: 1,
        quantity: 10,
      };
      await orderProductStore.create(orderProduct);

      const result = await store.mostPopularProduct(5);
      expect(result.length).not.toEqual(0);
    });
  });
});
