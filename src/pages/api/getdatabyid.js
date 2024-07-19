import FoodData from '@/components/models/foodDataSchema';
import db from '@/utils/db';

export default async function getdatabyid(req, res) {
  if (req.method === 'POST') {
    await db.connect();
    const item = await FoodData.findById(req.body.item);

    res.status(200).json({ item });
  }
  db.disconnect();
}
