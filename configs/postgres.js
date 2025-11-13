import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  user: process.env.PG_DEV_USER,
  password: process.env.PG_DEV_PASSWORD,
  host: process.env.PG_DEV_HOST,
  port: process.env.PG_DEV_PORT,
  database: process.env.PG_DEV_DB,
});

try {
  await pool.connect();
  await pool.query('SELECT NOW()')
  if (process.env.NODE_ENV !== 'production') {
    console.log('db connected');;
  }
} catch (e) {
  console.log(e);
}

export default pool;
