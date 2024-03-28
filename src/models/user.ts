import client from '../database';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id, first_name, last_name FROM users;`;
      const result = await conn.query(sql);
      conn.release;
      return result.rows;
    } catch (err) {
      throw new Error(`index users got error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`show user with id ${id}got error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users(first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.password,
      ]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`create user got error: ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE id = $1`;
      await conn.query(sql, [id]);
      conn.release;
      return;
    } catch (err) {
      throw new Error(`delete user with id ${id} got error: ${err}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET first_name = $2, last_name = $3, password = $4 WHERE id = $1)`;
      const result = await conn.query(sql, [
        user.id,
        user.first_name,
        user.last_name,
        user.password,
      ]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`update user with id ${user.id} got error: ${err}`);
    }
  }
}
