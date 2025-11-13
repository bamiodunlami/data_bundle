/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('transaction', (table) => {
    table.uuid('transaction_id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').notNullable();
    table.string('authorization_code').notNullable().unique();
    table.date('create_at').defaultTo(knex.fn.now());
    table.string('size').notNullable();
    table.foreign('user_id').references('user_id').inTable('user_table');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('transaction');
}
