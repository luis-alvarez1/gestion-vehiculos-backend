import { Schema, model } from "mongoose";

const stateSchema = new Schema(
  {
    id_state: {
      type: Number,
      required: true,
      trim: true,
    },
    name_state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("State", stateSchema);
