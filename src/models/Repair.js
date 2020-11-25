import { Schema, model } from "mongoose";

const repairSchema = new Schema({
  vehicle_state: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  id_spare_part: {
    type: String,
    required: true,
  },
  authorization: {
    type: String,
    required: true,
  },
});

export default model("Repair", repairSchema);
