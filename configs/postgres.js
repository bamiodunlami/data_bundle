import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool =
  process.env.NODE_ENV !== 'production'
    ? new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
      })
    : new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.RENDER ? false : { rejectUnauthorized: true } });

try {
  await pool.connect();
  await pool.query('SELECT NOW()');
  if (process.env.NODE_ENV !== 'production') {
    console.log('db connected');
  }
} catch (e) {
  console.log(e);
}

export default pool;
