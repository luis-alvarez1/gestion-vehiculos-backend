import Vehicle from "../../models/Vehicle";

const Mutation = {
  createVehicle: async (
    _,
    {
      vehicle_registration,
      vehicle_brand,
      vehicle_model,
      color,
      vehicle_state,
      owner,
      vehicle_type,
      userCreate,
      userUpdate,
    }
  ) => {
    const newVehicle = new Vehicle({
      vehicle_registration,
      vehicle_brand,
      vehicle_model,
      color,
      vehicle_state,
      owner,
      vehicle_type,
      userCreate,
      userUpdate,
    });
    return await newVehicle.save();
  },
};

export default Mutation;
