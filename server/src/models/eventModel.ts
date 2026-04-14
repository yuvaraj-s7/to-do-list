import { pool } from '../config/db';

export const EventModel = {
  async list(userId: number) {
    const { rows } = await pool.query('SELECT * FROM calendar_events WHERE user_id=$1 ORDER BY date, start_time', [userId]);
    return rows;
  },
  async create(userId: number, payload: Record<string, unknown>) {
    const { rows } = await pool.query(
      `INSERT INTO calendar_events (user_id,title,date,start_time,end_time,todo_id)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [userId, payload.title, payload.date, payload.startTime, payload.endTime, payload.todoId || null]
    );
    return rows[0];
  },
  async update(id: number, userId: number, payload: Record<string, unknown>) {
    const { rows } = await pool.query(
      `UPDATE calendar_events SET
      title=COALESCE($1,title), date=COALESCE($2,date),
      start_time=COALESCE($3,start_time), end_time=COALESCE($4,end_time)
      WHERE id=$5 AND user_id=$6 RETURNING *`,
      [payload.title, payload.date, payload.startTime, payload.endTime, id, userId]
    );
    return rows[0];
  },
  async delete(id: number, userId: number) {
    await pool.query('DELETE FROM calendar_events WHERE id=$1 AND user_id=$2', [id, userId]);
  }
};
