import FoodData from '@/components/models/foodDataSchema';
import db from '@/utils/db';
export default async function createfooddata(req, res, next) {
  if (req.method === 'POST') {
    await db.connect();

    try {
      const data = await FoodData.create({
        name: req.body.name,
        category: req.body.foodCategory,
        foodType: req.body.foodType,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img,
      });
    } catch (error) {
      console.log(error.message);
    }
    res.status(200).json(req.body);
  }
  db.disconnect();
}
