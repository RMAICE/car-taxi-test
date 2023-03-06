import { getObjects } from '../api/objects';
import DataDao from '../dao/data';

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
}

export default SyncService;
