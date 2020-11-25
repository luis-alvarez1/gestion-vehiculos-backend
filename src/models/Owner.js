import { Schema, model } from "mongoose";

const ownerSchema = new Schema({
  URLPhoto: {
    type: String,
    required: true,
  },
  num_document: {
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
  userCreate: {
    type: String,
    required: true,
  },
  userUpdate: {
    type: String,
    required: true,
  },
  vehicles: {
    type: String,
    required: true,
  },
});

export default model("Owner", ownerSchema);
