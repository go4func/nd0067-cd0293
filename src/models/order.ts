import client from '../database';

export type Order = {
  id?: number;
  product_id: number;
  user_id: number;
  quantity: number;
  status: string;
};

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders(product_id, user_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [
        order.product_id,
        order.user_id,
        order.quantity,
        order.status,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`create order got error: ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`index orders got error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`show order with id ${id} got error: ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders SET product_id = $2, quantity = $3, status = $4 WHERE id = $1 RETURNING *`;
      const result = await conn.query(sql, [
        order.id,
        order.product_id,
        order.quantity,
        order.status,
      ]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`update order with id ${order.id} got error: ${err}`);
    }
  }

  async getActiveOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'active';`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`index orders got error: ${err}`);
    }
  }

  async getCompleteOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'complete';`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`index orders got error: ${err}`);
    }
  }
}
