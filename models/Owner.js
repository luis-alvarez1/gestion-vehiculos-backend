import { Schema, model } from "mongoose";

const ownerSchema = new Schema({
  URLPhoto: {
    type: String,
    required: true,
  },
  num_document: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  userUpdate: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  vehicles: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
});

export default model("Owner", ownerSchema);
