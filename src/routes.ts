import { Router } from 'express';

import PointController from './app/controllers/PointController';
import ItemController from './app/controllers/ItemController';

const router = Router();

router.get('/items', ItemController.index);
router.get('/points/:id', PointController.show);
router.get('/points', PointController.index);
router.post('/points', PointController.store);

export default router;
