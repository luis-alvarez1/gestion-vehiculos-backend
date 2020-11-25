import { Schema, model } from "mongoose";

const partSchema = new Schema({
  id_part: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
});

export default model("Part", partSchema);
