import { Router } from 'express';
import { sync } from '../controllers/sync';

const router = Router();

router.get('/', sync);

export default router;
