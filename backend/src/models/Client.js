import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: { type: String, required: true },
  dui: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("Client", clientSchema);