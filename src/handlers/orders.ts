import type express from 'express';
import type { Request, Response } from 'express';
import type { Order } from '../models/order';
import { OrderStore } from '../models/order';
import auth from './authentications';
import {
  OrderProduct,
  OrderProductDetail,
  OrderProductStore,
} from '../models/orderProducts';

const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

const createOrder = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  try {
    const order: Order = await orderStore.create({
      user_id: authUser.id,
      status: 'active',
    } as Order);
    res.status(200).json(order);
  } catch (err) {
    console.error(`create order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const addOrderProduct = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;

  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json(`invalid order id`);
    return;
  }
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    res.status(400).json(`invalid request body`);
    return;
  }

  try {
    const order = await orderStore.show(id);
    if (!order) {
      res.status(400).json(`order not found`);
      return;
    }
    if (order.user_id !== authUser.id) {
      res.status(400).json(`not user's order`);
      return;
    }
    if (order.status === 'complete') {
      res.status(400).json(`order's completed`);
      return;
    }

    const orderProduct: OrderProduct = {
      order_id: order.id!,
      product_id: product_id,
      quantity: quantity,
    };
    const result = await orderProductStore.create(orderProduct);
    res.status(200).json(result);
  } catch (err) {
    console.error(`add order product got error: ${err}`);
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
    const order: Order = await orderStore.update({
      id: id,
      user_id: authUser.id,
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
    const orders: Order[] = await orderStore.getUserOrdersByStatus(
      authUser.id,
      'active',
    );
    let result: {
      products: OrderProductDetail[];
    }[] = [];
    for await (const order of orders) {
      const productDetails = await orderProductStore.getOrderProducts(
        order.id!,
      );
      result.push({
        ...order,
        products: productDetails,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(`get active order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const completeOrders = async (req: Request, res: Response) => {
  const authUser = req.body.auth.user;
  try {
    const orders: Order[] = await orderStore.getUserOrdersByStatus(
      authUser.id,
      'complete',
    );
    let result: {
      products: OrderProductDetail[];
    }[] = [];
    for await (const order of orders) {
      const productDetails = await orderProductStore.getOrderProducts(
        order.id!,
      );
      result.push({
        ...order,
        products: productDetails,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(`get active order got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const routes = (app: express.Application) => {
  app.post('/orders', auth.checkToken, createOrder);
  app.put('/orders/:id/products', auth.checkToken, addOrderProduct);
  app.put('/orders', auth.checkToken, updateOrder);
  app.get('/orders/active', auth.checkToken, activeOrders);
  app.get('/orders/complete', auth.checkToken, completeOrders);
};

export default {
  routes,
};
