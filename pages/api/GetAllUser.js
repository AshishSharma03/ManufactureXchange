import dbConnect from '../../utiles/db';
import CargoUser from '../../model/CargoUserSchema';

export default async function getAllCargoUsers(req, res) {
  const { method } = req;
  
  if (method === 'GET') {
    try {
      await dbConnect();

      const cargoUsers = await CargoUser.find();
      
      return res.status(200).json(cargoUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
