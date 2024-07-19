import PizzaOrderData from '@/components/models/pizzaData';
import db from '@/utils/db';

export default async function myOrdersData(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect();
      const data = await PizzaOrderData.findOne({ email: req.body.email });
      console.log(data);

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(200).json({ success: false, error: error.message });
    }
  }
}
