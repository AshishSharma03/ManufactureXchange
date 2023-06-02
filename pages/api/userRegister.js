import jwt from 'jsonwebtoken';
import { signToken } from '../../utiles/auth';
import bcrypt from 'bcryptjs';
import dbConnect from '../../utiles/db';
import CargoUser from '../../model/CargoUserSchema';


export default async function createCargoUser(req, res) {
  const { method } = req;
  
  if(method === 'POST'){
    
    
    try {
        await dbConnect()
        const { FirstName, LastName, userType, Email, password, Address, state, pinCode, city, order } = req.body;

        const existingUser = await CargoUser.findOne({ Email });

        if (existingUser) {

          return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new CargoUser({
          FirstName,
          LastName,
          userType,
          Email,
          password: hashedPassword,
          Address,
          state,
          pinCode,
          city,
          order,
        });

        const savedUser = await newUser.save();

        const token = signToken(savedUser);
        
        return res.status(200).json({ token ,userId : savedUser._id});
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
      }

    }
}
