import { Router } from 'express';
import knex from './database/connection';

const router = Router();

router.get('/items', async (req, res) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    image_url: `http://localhost:3001/uploads/${item.image}`,
  }));

  res.json(serializedItems);
});

router.post('/points', async (req, res) => {
  const {
    name,
    email,
    phone,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;

  const transaction = await knex.transaction();

  const insertedIds = await transaction('points').returning('id').insert({
    image: 'image-fake',
    name,
    email,
    phone,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => ({
    item_id,
    point_id,
  }));

  await transaction('point_items').insert(pointItems);

  res.json({ success: true });
});

export default router;
