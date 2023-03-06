import { config } from 'dotenv';
config();

const {
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER = 'postgres',
    POSTGRES_DB = 'positions',
} = process.env;

export const port = 3000;
export const prefix = '/api';
export const pg = {
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT) || 5432,
};
