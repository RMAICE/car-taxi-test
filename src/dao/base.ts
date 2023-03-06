import knex from '../db';

export default class BaseDao {
    public getTransaction() {
        return knex.transaction();
    }
}
