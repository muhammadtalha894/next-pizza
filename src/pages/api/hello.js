// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PizzaOrderData from '@/components/models/pizzaData';
import db from '@/utils/db';
export default async function handler(req, res) {
  // await db.connect();
  // const body = req.body;

  // try {
  //   const small = new PizzaOrderData(body);
  //   await small.save();

  // } catch (error) {
  //   console.log(error);
  // }

  res.status(200).json({ body: 'hello' });
}
