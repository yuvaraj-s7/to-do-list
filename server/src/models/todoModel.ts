import { pool } from '../config/db';

type TodoFilters = {
  q?: string;
  priority?: string;
  status?: string;
  sortBy?: 'due_date' | 'priority';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export const TodoModel = {
  async list(userId: number, filters: TodoFilters) {
    const conditions = ['user_id=$1'];
    const values: unknown[] = [userId];

    if (filters.q) {
      values.push(`%${filters.q}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }
    if (filters.priority) {
      values.push(filters.priority);
      conditions.push(`priority=$${values.length}`);
    }
    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status=$${values.length}`);
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;
    const sortBy = filters.sortBy || 'due_date';
    const order = filters.order || 'asc';

    const { rows } = await pool.query(
      `SELECT * FROM todos WHERE ${conditions.join(' AND ')} ORDER BY ${sortBy} ${order} NULLS LAST LIMIT ${limit} OFFSET ${offset}`,
      values
    );
    return rows;
  },

  async create(userId: number, payload: Record<string, unknown>) {
    const { rows } = await pool.query(
      `INSERT INTO todos (user_id,title,description,priority,status,due_date,recurring_type)
       VALUES ($1,$2,$3,$4,'pending',$5,$6) RETURNING *`,
      [userId, payload.title, payload.description || null, payload.priority, payload.dueDate || null, payload.recurringType || 'none']
    );
    return rows[0];
  },

  async update(id: number, userId: number, payload: Record<string, unknown>) {
    const { rows } = await pool.query(
      `UPDATE todos SET
      title=COALESCE($1,title),
      description=COALESCE($2,description),
      priority=COALESCE($3,priority),
      status=COALESCE($4,status),
      due_date=COALESCE($5,due_date),
      recurring_type=COALESCE($6,recurring_type)
      WHERE id=$7 AND user_id=$8 RETURNING *`,
      [payload.title, payload.description, payload.priority, payload.status, payload.dueDate, payload.recurringType, id, userId]
    );
    return rows[0];
  },

  async delete(id: number, userId: number) {
    await pool.query('DELETE FROM todos WHERE id=$1 AND user_id=$2', [id, userId]);
  },

  async byUser(userId: number) {
    const { rows } = await pool.query('SELECT * FROM todos WHERE user_id=$1', [userId]);
    return rows;
  }
};
