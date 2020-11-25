import { Schema, model } from "mongoose";

const typeSchema = new Schema({
  id_type: {
    type: String,
    required: true,
  },
  name_type: {
    type: String,
    required: true,
  },
});

export default model("Type", typeSchema);
