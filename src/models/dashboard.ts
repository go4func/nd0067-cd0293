import client from '../database';

export type Dashboard = {
  product_id: number;
  product_name: string;
  category: string;
  orders_count: number;
};

export class DashboardStore {
  async mostPopularProduct(limit: number): Promise<Dashboard[]> {
    try {
      const conn = await client.connect();
      const sql: string = `SELECT p.id as product_id, p.name as product_name, p.category, sum(o.quantity) as orders_count FROM products p INNER JOIN orders o ON p.id = o.product_id GROUP BY p.id ORDER BY orders_count DESC limit $1;`;

      const result = await conn.query(sql, [limit]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`get top ${limit} products got error: ${err}`);
    }
  }
}
