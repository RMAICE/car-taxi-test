import { Knex } from 'knex';

export interface Data {
    id: string;
    name: string;
    date: Date;
}

declare module 'knex/types/tables' {
    interface Tables {
        data: Data;
    }
}
