import { getObjects } from '../api/objects';
import DataDao from '../dao/data';
import knexConfig from '../../knexfile';
import { toStringData } from '../utils/format';

class SyncService {
    private data;

    constructor() {
        this.data = new DataDao();
    }

    public async sync(): Promise<{
        added: number;
        deleted: number;
        updated: number;
    }> {
        await this.resetDb();
        const incoming = await getObjects();
        const transaction = await this.data.getTransaction();

        try {
            const removed = await this.data.removeNotIncludedIn(
                incoming,
                transaction
            );
            const inserted = await this.data.insertIgnoringConflicts(
                incoming,
                transaction
            );
            const toUpdate = incoming.filter(({ id }) => !inserted.has(id));

            await this.data.insertMergingConflicts(toUpdate, transaction);
            await transaction.commit();

            const data = await this.data.getAll();
            console.log('---- AFTER');
            console.log(data.map(toStringData));

            return {
                added: inserted.size,
                deleted: removed.length,
                updated: incoming.length - inserted.size,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    private async resetDb() {
        await this.data.knex.seed.run({
            directory: knexConfig.seeds?.directory,
        });
    }
}

export default SyncService;
