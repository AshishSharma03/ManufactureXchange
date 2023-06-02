// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utiles/db"
import CargoOrders from "../../model/CargoOrderSchema";
export default async function handler(req, res) {
    try{
        await dbConnect()
        const {method} = req
        if(method === "PUT"){
            const { id } = req.query
            const {cost } = req.body
            const updatedOrder  = await CargoOrders.findByIdAndUpdate(id,{cost},{new:true});
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not found" });
              }
        
              return res.status(200).json(updatedOrder);
        

        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server Error" });


    }


  }
  