/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.enu('role', ['user', 'admin']).defaultTo('user');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.dropColumn('role');
  });
}
