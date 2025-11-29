/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.boolean('email_verified').defaultTo(false);
    table.boolean('phone_verified').defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('user_table', (table) => {
    table.dropColumns('email_verified', 'phone_verified');
  });
}
