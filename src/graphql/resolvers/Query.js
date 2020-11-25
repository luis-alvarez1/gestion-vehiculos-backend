import Vehicle from "../../models/Vehicle";
import Owner from "../../models/Owner";
import Repair from "../../models/Repair";
import Part from "../../models/Part";
import Type from "../../models/Type";
import User from "../../models/User";
import Rol from "../../models/Rol";

const Query = {
  ping() {
    return "pong!";
  },

  vehicles: async () => {
    return await Vehicle.find();
  },
  owners: async () => {
    return await Owner.find();
  },
  users: async () => {
    return await User.find();
  },
  repairs: async () => {
    return await Repair.find();
  },
  parts: async () => {
    return await Part.find();
  },
  types: async () => {
    return await Type.find();
  },
  rols: async () => {
    return await Rol.find();
  },
};

export default Query;
