import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable('data');
    if (hasTable) throw new Error('table "data" already exists');

    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable('data', table => {
        table
            .uuid('id', { primaryKey: true })
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name', 255);
        table.datetime('date').defaultTo(knex.fn.now());
    });
}

export async function down(): Promise<void> {}
