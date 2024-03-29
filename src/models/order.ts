import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders( user_id, status) VALUES($1, $2) RETURNING *`;
      const result = await conn.query(sql, [order.user_id, order.status]);
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
      const sql = `UPDATE orders SET status = $3 WHERE id = $1 and user_id = $2 RETURNING *`;
      const result = await conn.query(sql, [
        order.id,
        order.user_id,
        order.status,
      ]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`update order with id ${order.id} got error: ${err}`);
    }
  }

  async getActiveOrders(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'active';`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`index orders got error: ${err}`);
    }
  }

  async getCompleteOrders(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'complete';`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`index orders got error: ${err}`);
    }
  }
}
