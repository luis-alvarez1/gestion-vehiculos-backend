import Vehicle from "../../models/Vehicle";

const Query = {
  ping() {
    return "pong!";
  },

  vehicles: async () => {
    return await Vehicle.find();
  },
};

export default Query;
