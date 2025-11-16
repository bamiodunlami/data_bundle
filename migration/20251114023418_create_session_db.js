/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up (knex) {
  return knex.schema.createTable('session_table', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id');
    table.string('session').unique();
    table.timestamps(true, true);
    table.boolean('status');
    table.foreign('user_id').references('user_id').inTable('user_table');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('session_table');
};
