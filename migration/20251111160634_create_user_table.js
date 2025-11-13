/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async  function up (knex) {
  return knex.schema.createTable('user_table', (table) => {
    table.uuid('user_id').primary().defaultTo(knex.fn.uuid());
    table.string('name').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
    return knex.schema.dropTableIfExists('user_table')
};
