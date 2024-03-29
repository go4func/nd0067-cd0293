import client from '../database';

export type OrderProduct = {
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductStore {
  async create(order: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [
        order.order_id,
        order.product_id,
        order.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`create order product got error: ${err}`);
    }
  }

  async show(orderId: number): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM order_products WHERE order_id = $1;`;
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `show order product with id ${orderId} got error: ${err}`,
      );
    }
  }
}
