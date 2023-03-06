// eslint-disable-next-line node/no-unpublished-import
import { faker } from '@faker-js/faker';
import DataDao from '../dao/data';
import { Data } from '../types';
import { toStringData } from '../utils/format';

function getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
    return `${faker.vehicle.manufacturer()}:${faker.vehicle.vin()}`;
}

function getNewItems() {
    return Array(getRandomNumber(0, 9))
        .fill(null)
        .map(() => ({
            id: faker.datatype.uuid(),
            date: new Date(),
            name: getRandomName(),
        }));
}

function updateNames(data: Data[], start: number, end: number) {
    return data.slice(start, end).map(o => ({ ...o, name: getRandomName() }));
}

export async function getObjects(): Promise<Data[]> {
    const dataDao = new DataDao();
    const data = await dataDao.getAll();

    console.log('---- BEFORE');
    console.log(data.map(toStringData));

    const start = getRandomNumber(0, data.length - 1);
    const end = getRandomNumber(start + 1, data.length - 1);
    const toInsert = getNewItems();
    const toUpdate = updateNames(data, start, end);

    console.log({
        toUpdate: toUpdate.length,
        toInsert: toInsert.length,
        toDelete: data.length - toUpdate.length,
    });

    return [...toUpdate, ...toInsert];
}
