import type { Product, ProductFilter } from '../../models/product';
import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Model: Product', () => {
  describe('method create', () => {
    it('should have an create method', async () => {
      expect(store.create).toBeDefined;
    });
    it('should return created product', async () => {
      const product: Product = {
        name: 'macbook pro 14',
        category: 'laptop',
      };
      const result: Product = await store.create(product);
      expect(result.id).toBeDefined;
      expect(result.name).toEqual(product.name);
      expect(result.category).toEqual(product.category);
    });
  });
  describe('method index', () => {
    it('should have an index method', async () => {
      expect(store.index).toBeDefined;
    });
    it('should return list of products', async () => {
      const result = await store.index();
      expect(result.length).not.toEqual(0);
    });
    it('should return list of products with category=laptop', async () => {
      const filter: ProductFilter = {
        category: 'laptop',
      };
      const result = await store.index(filter);
      expect(result.length).not.toEqual(0);
    });
  });
  describe('method show', () => {
    it('should have an show method', async () => {
      expect(store.show).toBeDefined;
    });
    it('should return product info', async () => {
      const result: Product = await store.show(1);
      expect(result.id).toEqual(1);
    });
  });
});
