import type { Knex } from 'knex';
import { pg } from './src/config/index';

const config: Knex.Config = {
    client: 'pg',
    connection: pg,
    migrations: {
        tableName: 'knex_migrations',
        directory: './src/migrations',
    },
    seeds: {
        directory: './src/seeds',
    },
};

export default config;
