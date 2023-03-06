// eslint-disable-next-line node/no-unpublished-import
import { faker } from '@faker-js/faker';
import knex from '../db';
import { Data } from '../types';
import knexConfig from '../../knexfile';

function getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
    return `${faker.vehicle.manufacturer()}:${faker.vehicle.vin()}`;
}

export async function getObjects(): Promise<Data[]> {
    await knex.seed.run({ directory: knexConfig.seeds?.directory });
    const data = await knex('data')
        .select('*')
        .then(d => d);

    const start = getRandomNumber(0, data.length - 1);
    const end = getRandomNumber(start + 1, data.length - 1);
    const toInsert = Array(end - getRandomNumber(start, end - 1))
        .fill(null)
        .map(() => ({
            id: faker.datatype.uuid(),
            date: new Date(),
            name: getRandomName(),
        }));
    const toUpdate = data
        .slice(start, end)
        .map(o => ({ ...o, name: getRandomName() }));

    console.log({
        toUpdate: toUpdate.length,
        toInsert: toInsert.length,
        toDelete: data.length - toUpdate.length,
    });

    return [...toUpdate, ...toInsert];
}
