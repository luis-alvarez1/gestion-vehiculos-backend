import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
  {
    vehicle_registration: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_brand: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_model: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_state: {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
    },
    vehicle_type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    userCreate: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    userUpdate: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

export default model("Vehicle", vehicleSchema);
