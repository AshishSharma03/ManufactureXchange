import CargoOrders from "../../model/CargoOrderSchema";
import dbConnect from "../../utiles/db";

export default async function getAllOrders(req, res) {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const orders = await CargoOrders.find();
      return res.status(200).json(orders);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
