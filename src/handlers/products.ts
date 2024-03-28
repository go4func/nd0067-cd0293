import type express from 'express';
import type { Request, Response } from 'express';
import type { Product } from '../models/product';
import { ProductStore } from '../models/product';
import auth from './authentications';

const store: ProductStore = new ProductStore();

const index = async (req: Request, res: Response) => {
  const category = req.query.category;
  try {
    let products: Product[];

    if (category) {
      products = await store.index({ category: category as string });
    } else {
      products = await store.index();
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(`index product got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};
const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product: Product = await store.show(parseInt(id));
    res.status(200).json(product);
  } catch (err) {
    console.error(`show product got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};
const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    category: req.body.category,
  };
  try {
    const result: Product = await store.create(product);
    res.status(200).json(result);
  } catch (err) {
    console.error(`show product got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const routes = (app: express.Application) => {
  app.post('/products', auth.checkToken, create);
  app.get('/products', index);
  app.get('/products/:id', show);
};

export default {
  routes,
};
