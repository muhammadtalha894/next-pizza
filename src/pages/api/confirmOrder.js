import PizzaOrderData from '@/components/models/pizzaData';
import User from '@/components/models/user';
import db from '@/utils/db';

export default async function confirmOrder(req, res) {
  console.log(req.body);
  const { email, order_date, order_data } = req.body;

  if (req.method === 'POST') {
    await db.connect();
    let data = order_data;
    await data.splice(0, 0, { order_date });

    const order = await PizzaOrderData.findOne({ email });
    try {
      if (!order) {
        const createOrder = await PizzaOrderData.create({
          email,
          order_data: [data],
        });
        if (createOrder) {
          res
            .status(201)
            .json({ success: true, message: 'Order Receviced Successfully!' });
        }
      }

      if (order) {
        await PizzaOrderData.findOneAndUpdate(
          { email: email },
          { $push: { order_data: data } },
        );

        res
          .status(201)
          .json({ success: true, message: 'Order Receviced Successfully!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: true,
        message: error.message || 'Internal server error',
      });
    }
  }
}
