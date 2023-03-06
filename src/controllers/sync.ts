import { Request, Response } from 'express';
import SyncService from '../services/sync';

export async function sync(req: Request, res: Response): Promise<void> {
    const syncService = new SyncService();
    const result = await syncService.sync();
    res.json(result);
}
