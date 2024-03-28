import client from '../database';

export type Product = {
  id?: number;
  name: string;
  category: string;
};

export type ProductFilter = {
  category?: string;
};

export class ProductStore {
  async index(filter?: ProductFilter): Promise<Product[]> {
    try {
      const conn = await client.connect();
      let sql: string = `SELECT * FROM products;`;
      let values: string[] = [];
      if (filter?.category) {
        sql = `SELECT * FROM products WHERE category = $1;`;
        values = [filter.category];
      }

      const result = await conn.query(sql, values);
      conn.release;
      return result.rows;
    } catch (err) {
      throw new Error(`index products got error: ${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`show product with id ${id}got error: ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products(name, category) VALUES($1, $2) RETURNING *`;
      const result = await conn.query(sql, [product.name, product.category]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`create product got error: ${err}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE id = $1`;
      await conn.query(sql, [id]);
      conn.release;
      return;
    } catch (err) {
      throw new Error(`delete product with id ${id} got error: ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products SET name = $2, category = $3 WHERE id = $1)`;
      const result = await conn.query(sql, [
        product.id,
        product.name,
        product.category,
      ]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`update product with id ${product.id} got error: ${err}`);
    }
  }
}
