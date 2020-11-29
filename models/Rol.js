import { Schema, model } from "mongoose";

const rolSchema = new Schema(
  {
    id_rol: {
      type: Number,
      required: true,
      trim: true,
    },
    name_rol: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Rol", rolSchema);
