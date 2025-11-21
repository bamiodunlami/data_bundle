/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.timestamp('password_changed_at', {
      useTz: true,
    });
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.dropColumn('password_changed_at');
  });
}
