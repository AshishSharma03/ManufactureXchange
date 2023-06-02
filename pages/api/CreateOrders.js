import CargoOrders from "../../model/CargoOrderSchema";
import dbConnect from "../../utiles/db";


export default async function createCargoOrder(req, res) {
  try {
    await dbConnect();

    if (req.method === 'POST') {
      const {
        OrderID,
        To,
        From,
        Quantity,
        ManufectureID,
        TransporterUser,
        pinCode,
        State,
        City,
        Country,
        Address,
        cost,
      } = req.body;
      console.log({
        OrderID,
        To,
        From,
        Quantity,
        ManufectureID,
        TransporterUser,
        pinCode,
        State,
        City,
        Country,
        Address,
        cost,
      })
      const cargoOrder = new CargoOrders({
        OrderID,
        To,
        From,
        Quantity,
        ManufectureID,
        TransporterUser,
        pinCode,
        State,
        City,
        Country,
        Address,
        cost,
      });

      const savedOrder = await cargoOrder.save();

      return res.status(201).json(savedOrder);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
