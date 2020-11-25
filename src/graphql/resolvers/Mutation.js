import Owner from "../../models/Owner";
import Vehicle from "../../models/Vehicle";
import Repair from "../../models/Repair";
import Part from "../../models/Part";
import Type from "../../models/Type";
import User from "../../models/User";
import Rol from "../../models/Rol";

const Mutation = {
  //creacion tabla vehiculos
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
  //creacion tabla owners
  createOwner: async (
    _,
    {
      URLPhoto,
      num_document,
      name,
      last_name,
      email,
      phone,
      userCreate,
      userUpdate,
      vehicles,
    }
  ) => {
    const newOwner = new Owner({
      URLPhoto,
      num_document,
      name,
      last_name,
      email,
      phone,
      userCreate,
      userUpdate,
      vehicles,
    });
    return await newOwner.save();
  },
  //creacion tabla users
  createUser: async (
    _,
    {
      user,
      password,
      name,
      last_name,
      email,
      phone,
      id_rol,
      userCreate,
      userUpdate,
    }
  ) => {
    const newUser = new User({
      user,
      password,
      name,
      last_name,
      email,
      phone,
      id_rol,
      userCreate,
      userUpdate,
    });
    return await newUser.save();
  },
  //creacion tabla reparacion
  createRepair: async (
    _,
    { vehicle_state, cost, vehicle, id_spare_part, authorization }
  ) => {
    const newRepair = new Repair({
      vehicle_state,
      cost,
      vehicle,
      id_spare_part,
      authorization,
    });
    return await newRepair.save();
  },
  //creacion tabla partes
  createPart: async (_, { id_part, cost }) => {
    const newPart = new Part({
      id_part,
      cost,
    });
    return await newPart.save();
  },
  //creacion tabla tipos
  createType: async (_, { id_type, name_type }) => {
    const newType = new Type({
      id_type,
      name_type,
    });
    return await newType.save();
  },
  //creacion tabla roles
  createRol: async (_, { id_rol, name_rol }) => {
    const newRol = new Rol({
      id_rol,
      name_rol,
    });
    return await newRol.save();
  },
};

export default Mutation;
