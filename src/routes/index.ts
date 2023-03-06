import { Router } from 'express';

import syncRouter from './sync';

const router = Router();

router.use('/sync', syncRouter);

export default router;
