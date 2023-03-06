import { Knex } from 'knex';
import knex from '../db';
import { Data } from '../types';
import BaseDao from './base';

class DataDao extends BaseDao {
    public knex: Knex;

    constructor() {
        super();
        this.knex = knex;
    }

    public async insertIgnoringConflicts(
        rows: Data[],
        transaction?: Knex.Transaction
    ) {
        const query = knex('data');

        if (transaction) query.transacting(transaction);

        const inserted = await query
            .insert(rows)
            .returning('id')
            .onConflict()
            .ignore();
        const uniqIds = new Set(inserted.map(({ id }) => id));

        return uniqIds;
    }

    public async insertMergingConflicts(
        rows: Data[],
        transaction?: Knex.Transaction
    ) {
        const query = knex('data');

        if (transaction) query.transacting(transaction);

        await query
            .insert(rows)
            .returning('id')
            .onConflict('id')
            .merge(['date', 'name']);
    }

    public async removeNotIncludedIn(
        rows: Pick<Data, 'id'>[],
        transaction?: Knex.Transaction
    ) {
        const query = knex('data');

        if (transaction) query.transacting(transaction);

        const removed = await query
            .whereNotIn(
                'id',
                rows.map(({ id }) => id)
            )
            .delete('id')
            .then();

        return removed;
    }
}

export default DataDao;
