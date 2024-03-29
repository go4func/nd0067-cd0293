import type { Order } from '../../models/order';
import { OrderStore } from '../../models/order';
import type { OrderProduct} from '../../models/orderProducts';
import { OrderProductStore } from '../../models/orderProducts';
import type { Product } from '../../models/product';
import { ProductStore } from '../../models/product';
import type { User } from '../../models/user';
import { UserStore } from '../../models/user';

const store = new OrderProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Model: OrderProduct', () => {
  describe('method create', () => {
    it('should have an create method', async () => {
      expect(store.create).toBeDefined;
    });
    it('should return created order product', async () => {
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
      const result = await store.create(orderProduct);
      expect(result.order_id).toEqual(orderProduct.order_id);
      expect(result.product_id).toEqual(orderProduct.product_id);
      expect(result.quantity).toEqual(orderProduct.quantity);
    });
  });
});
