import client from '../database';

export type Dashboard = {
  product_id: number;
  name: string;
  category: string;
  sum: number;
};

export class DashboardStore {
  async mostPopularProduct(limit: number): Promise<Dashboard[]> {
    try {
      const conn = await client.connect();
      const sql: string = `SELECT p.id as product_id, p.name, p.category, SUM(op.quantity) as sum from products p INNER JOIN order_products op ON op.product_id = p.id GROUP BY p.id ORDER BY sum DESC LIMIT $1`;

      const result = await conn.query(sql, [limit]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`get top ${limit} products got error: ${err}`);
    }
  }
}
