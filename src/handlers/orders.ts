import type express from 'express';
import type { Request, Response } from 'express';
import type { Order } from '../models/order';
import { OrderStore } from '../models/order';
import auth from './authentications';

const store = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    res.status(400).json(`invalid request body`);
    return;
  }

  try {
    const order: Order = await store.create({
      product_id: product_id,
      user_id: authUser.id,
      quantity: quantity,
      status: 'active',
    } as Order);
    res.status(200).json(order);
  } catch (err) {
    console.error(`create order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  const { id, product_id, quantity, status } = req.body;
  if (!id) {
    res.status(400).json(`id is required`);
    return;
  }
  if (!product_id && !quantity && !status) {
    res.status(400).json(`invalid request body`);
    return;
  }

  try {
    const order: Order = await store.update({
      id: id,
      product_id: product_id,
      quantity: quantity,
      status: status,
    } as Order);
    res.status(200).json(order);
  } catch (err) {
    console.error(`update order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const activeOrders = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  try {
    const orders: Order[] = await store.getActiveOrders(authUser.id);
    res.status(200).json(orders);
  } catch (err) {
    console.error(`get active order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const completeOrders = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  try {
    const orders: Order[] = await store.getCompleteOrders(authUser.id);
    res.status(200).json(orders);
  } catch (err) {
    console.error(`get active order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const routes = (app: express.Application) => {
  app.post('/orders', auth.checkToken, createOrder);
  app.put('/orders', auth.checkToken, updateOrder);
  app.get('/orders/active', auth.checkToken, activeOrders);
  app.get('/orders/complete', auth.checkToken, completeOrders);
};

export default {
  routes,
};
