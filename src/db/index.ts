import knex from 'knex';
import { pg } from '../config';

const db = knex({
    client: 'pg',
    connection: pg,
});

db.schema.raw('SELECT 1+1').then(() => {
    console.log('connected to db');
});

export default db;
