import db from '@/utils/db';

import FoodData from '@/components/models/foodDataSchema';

export default async function foodData(req, res) {
  await db.connect();
  if (req.method === 'POST') {
    for (let i = 0; i < req.body.length; i++) {
      const data = new FoodData({
        name: req.body[i].name,
        category: req.body[i].category,
        foodType: req.body[i].foodType,
        price: req.body[i].price,
        description: req.body[i].description,
        img: req.body[i].img,
      });
      await data.save();
    }

    res.status(201).json({ success: true });
  }
  if (req.method === 'GET') {
    await db.connect();
    const data = await FoodData.find();

    res.status(200).json(data);
  }

  db.disconnect();
}
