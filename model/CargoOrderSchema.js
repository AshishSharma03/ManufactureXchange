import mongoose from 'mongoose';

const CargoOrderSchema = new mongoose.Schema({
  OrderID : {type: String, required: true },
  To: { type: String, required: true },
  From: { type: String, required: true },
  Quantity: { type: Number, required: true },
  ManufectureID : {type :String , required :true},
  TransporterUser: { type :String , required :true },
  pinCode: { type: String, required: true },
  State: { type: String, required: true },
  City: { type: String, required: true },
  Country: { type: String, required: true },
  Address: { type: String, required: true },
  cost : {type : String,required:false}
},
{
    timestamps: true,
}
);




let CargoOrders;
try {
    CargoOrders = mongoose.model("CargoOrder");
} catch (error) {
    CargoOrders = mongoose.model("CargoOrder", CargoOrderSchema);
}

module.exports = CargoOrders;