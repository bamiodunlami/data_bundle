/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.alterTable('user_table', (table)=>{
    table.timestamp('last_login').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.alterTable("user_table", (table)=>{
    table.dropColumn('last_login')
  })
};
