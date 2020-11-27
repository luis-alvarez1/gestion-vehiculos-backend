import { Schema, model } from "mongoose";

const partSchema = new Schema({
  id_part: {
    type: Number,
    required: true,
    trim: true,
  },
  name_part: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    trim: true,
  },
});

export default model("Part", partSchema);
