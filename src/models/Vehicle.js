import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
  vehicle_registration: {
    type: String,
    required: true,
  },
  vehicle_brand: {
    type: String,
    required: true,
  },
  vehicle_model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  vehicle_state: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  vehicle_type: {
    type: String,
    required: true,
  },
  userCreate: {
    type: String,
    required: true,
  },
  userUpdate: {
    type: String,
    required: true,
  },
});

export default model("Vehicle", vehicleSchema);
