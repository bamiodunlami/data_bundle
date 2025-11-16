/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('transaction', (table) => {
    table.enu('status', ['processing', 'completed']).defaultTo('processing');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('transaction', (table) => {
    table.dropColumn('staus');
  });
}
