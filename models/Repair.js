import { Schema, model } from "mongoose";

const repairSchema = new Schema(
  {
    vehicle_state: {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    id_spare_part: {
      type: Schema.Types.ObjectId,
      ref: "Part",
    },
    authorization: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Repair", repairSchema);
