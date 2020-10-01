import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({OK: 'rota separada'})
});

export default router;