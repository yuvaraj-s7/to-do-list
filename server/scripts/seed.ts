import bcrypt from 'bcryptjs';
import { pool } from '../src/config/db';

async function seed() {
  const password = await bcrypt.hash('password123', 10);
  const user = await pool.query(
    `INSERT INTO users (name,email,password) VALUES ('Demo User','demo@example.com',$1)
    ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
    [password]
  );
  const userId = user.rows[0].id;

  await pool.query('DELETE FROM todos WHERE user_id=$1', [userId]);
  await pool.query('DELETE FROM calendar_events WHERE user_id=$1', [userId]);

  const todo = await pool.query(
    `INSERT INTO todos (user_id,title,priority,status,due_date,recurring_type)
     VALUES ($1,'Pay electricity bill','high','pending',CURRENT_DATE,'none') RETURNING id`,
    [userId]
  );

  await pool.query(
    `INSERT INTO calendar_events (user_id,title,date,start_time,end_time,todo_id)
     VALUES ($1,'Focus Session',CURRENT_DATE,'10:00','11:00',$2)`,
    [userId, todo.rows[0].id]
  );

  console.log('Seeded demo data');
  await pool.end();
}

seed();
