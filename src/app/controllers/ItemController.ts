import { Request, Response } from 'express';
import knex from '../../database/connection';

class ItemController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3001/uploads/${item.image}`,
    }));

    res.json(serializedItems);
  }
}

export default new ItemController();
