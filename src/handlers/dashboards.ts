import type express from 'express';
import type { Request, Response } from 'express';
import type { Product } from '../models/product';
import { DashboardStore } from '../models/dashboard';

const store: DashboardStore = new DashboardStore();

const fiveMostPopular = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await store.mostPopularProduct(5);
    res.status(200).json(products);
  } catch (err) {
    console.error(`get 5 most popular product got error: ${err}`);
    res.status(500).json(`internal server error.`);
  }
};

const routes = (app: express.Application) => {
  app.get('/five-most-popular', fiveMostPopular);
};

export default {
  routes,
};
