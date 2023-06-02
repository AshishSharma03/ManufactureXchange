import CargoUser from "../../model/CargoUserSchema";
import { signToken } from "../../utiles/auth";
import dbConnect from "../../utiles/db";
import bcrypt from 'bcryptjs';

export default async function UserLogin(req, res) {

    const { method } = req;

    if(method === 'POST'){
    try{

        await dbConnect()
        const {Email,password} = req.body
        const user = await CargoUser.findOne({Email})
        if(user && bcrypt.compareSync(password,user.password)){
            const token = signToken(user);
           return res.json({
            token,
                _id:user._id,
                FirstName : user.FirstName,
                LastName : user.LastName,
                userType : user.userType,
                Email : user.Email,
                Address : user.Address,
                state : user.state,
                pinCode : user.pinCode,
                city : user.city,
                order : user.order,
            })
        }else {
           return res.status(401).json({ message: 'Invalid email or password' });
           res.status(500).send({message:'Check your connection'})
          }


    }catch(error){

            console.log(error)

        }
    }
}
  