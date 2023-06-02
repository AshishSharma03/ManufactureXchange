const mongoose = require("mongoose");

const CargoUserSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  userType: { type: String, required: true },
  Email: { type: String, required: true },
  password: { type: String, required: true },
  Address: { type: String, required: false },
  state: { type: String, required: false },
  pinCode: { type: String, required: false },
  city: { type: String, required: false },
  order: { type: Array, default: [] },
});

let CargoUser;
try {
  CargoUser = mongoose.model("CargoUser");
} catch (error) {
  CargoUser = mongoose.model("CargoUser", CargoUserSchema);
}

module.exports = CargoUser;
