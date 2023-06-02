// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utiles/db"
import CargoUser from '../../model/CargoUserSchema';

export default async function handler(req, res) {
    try{
        await dbConnect()
        const {method} = req
        if(method === "GET"){
            const { id } = req.query
            const User = await CargoUser.findById(id)
            res.status(200).json(User)

        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server Error" });


    }


  }
  