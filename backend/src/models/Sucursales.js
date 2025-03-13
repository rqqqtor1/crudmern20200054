import mongoose from "mongoose";

const sucursalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  schedule: { type: String, required: true },
});

export default mongoose.model("Sucursal", sucursalSchema);