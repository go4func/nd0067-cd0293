import client from '../database';
import type { Product } from './product';

export class DashboardStore {
  async mostPopularProduct(limit: number): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql: string = `SELECT p.id, p.name, p.category, sum(o.quantity) as orders FROM products p INNER JOIN orders o ON p.id = o.product_id GROUP BY p.id ORDER BY orders DESC limit $1;`;

      const result = await conn.query(sql, [limit]);
      conn.release;
      return result.rows;
    } catch (err) {
      throw new Error(`get top ${limit} products got error: ${err}`);
    }
  }
}
