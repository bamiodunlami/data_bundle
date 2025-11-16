/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('password_reset', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').notNullable();
    table.string('token_hashed').unique();
    table.timestamp('expire_at');
    table.boolean('used');
    table.timestamps(true, true);
    table.foreign('user_id').references('user_id').inTable('user_table');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('password_reset');
}
