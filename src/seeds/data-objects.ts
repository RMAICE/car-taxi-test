import { Knex } from 'knex';
// eslint-disable-next-line node/no-unpublished-import
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('data').del();

    // Inserts seed entries
    await knex('data').insert(
        Array(10)
            .fill(null)
            .map(() => ({
                name: `${faker.vehicle.manufacturer()}:${faker.vehicle.vin()}`,
            }))
    );
}
