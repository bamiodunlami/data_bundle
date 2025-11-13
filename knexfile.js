// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import 'dotenv/config';
export default {
  development: {
    client: 'pg',
    connection: {
      user: process.env.PG_DEV_USER,
      password: process.env.PG_DEV_PASSWORD,
      host: process.env.PG_DEV_HOST,
      port: process.env.PG_DEV_PORT,
      database: process.env.PG_DEV_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // tableName: 'knex_migrations',
      directory: './migration',
      extension: 'js',
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
