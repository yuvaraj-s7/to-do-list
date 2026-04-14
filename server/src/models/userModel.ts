import { pool } from '../config/db';

export const UserModel = {
  async createUser(name: string, email: string, password: string) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email, created_at',
      [name, email, password]
    );
    return rows[0];
  },
  async getByEmail(email: string) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return rows[0];
  },
  async getById(id: number) {
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users WHERE id=$1', [id]);
    return rows[0];
  }
};
