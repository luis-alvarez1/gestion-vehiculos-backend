import { Schema, model } from "mongoose";

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  id_rol: {
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

export default model("User", userSchema);
