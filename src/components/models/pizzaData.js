import mongoose from 'mongoose';

const pizzaDataSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },

    order_data: { type: Array, required: true },
  },
  { timestamps: true },
);

const PizzaOrderData =
  mongoose.models.PizzaOrderData ||
  mongoose.model('PizzaOrderData', pizzaDataSchema);

export default PizzaOrderData;
