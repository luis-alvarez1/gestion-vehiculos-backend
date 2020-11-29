import { Schema, model } from "mongoose";

const typeSchema = new Schema(
  {
    id_type: {
      type: Number,
      required: true,
      trim: true,
    },
    name_type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Type", typeSchema);
