import { Schema, model } from "mongoose";

const rolSchema = new Schema({
  id_rol: {
    type: String,
    required: true,
  },
  name_rol: {
    type: String,
    required: true,
  },
});

export default model("Rol", rolSchema);
