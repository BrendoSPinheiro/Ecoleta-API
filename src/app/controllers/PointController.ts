import { Request, Response } from 'express';
import knex from '../../database/connection';

class PointController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',').map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ error: 'Point not found!' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id).select('items.title');

    res.json({ point, items });
  }

  async store(req: Request, res: Response) {
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

    const point = {
      image: 'image-fake',
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      uf,
    };

    const transaction = await knex.transaction();

    const [point_id] = await transaction('points').returning('id').insert(point);

    const pointItems = items.map((item_id: number) => ({
      point_id,
      item_id,
    }));

    await transaction('point_items').insert(pointItems);

    await transaction.commit();

    res.json({
      id: point_id,
      ...point,
    });
  }
}

export default new PointController();
