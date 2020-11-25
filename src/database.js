import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ladino:asd$123@cluster0.rhjwj.mongodb.net/gestion-vehiculos?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log("database connected"))
  .catch((err) => console.log(err));
