import User from "../models/User";
import Owner from "../models/Owner";
import Part from "../models/Part";
import Repair from "../models/Repair";
import Rol from "../models/Rol";
import State from "../models/State";
import Type from "../models/Type";
import Vehicle from "../models/Vehicle";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { users } from "../helpers/index";

dotenv.config({ path: ".env" });

const resolvers = {
  Query: {
    users: async () => await User.find(),

    owners: async (_, {}, ctx) => {
      return await Owner.find();
    },
    parts: async () => {
      return await Part.find();
    },
    repairs: async () => {
      return await Repair.find();
    },
    rols: async () => {
      return await Rol.find();
    },
    types: async () => {
      return await Type.find();
    },
    vehicles: async () => {
      return await Vehicle.find();
    },
    getVehiclesByOwner: async (_, { input }) => {
      return await Vehicle.find({ owner: input._id });
    },
  },

  //Mutations
  Mutation: {
    createUser: async (root, { input }, ctx) => {
      const { email, password } = input;

      const userExist = await User.findOne({
        email,
      });

      if (userExist) {
        throw new Error("User already exist ");
      }

      try {
        const salt = await bcrypt.genSalt(10);
        input.password = await bcrypt.hash(password, salt);

        const newUser = new User(input);
        await newUser.save();

        return "User Created";
      } catch (error) {
        console.log(error);
      }
    },

    authUser: async (root, { input }, ctx) => {
      const { email, password } = input;

      const lastUser = await User.findOne({ email });

      if (!lastUser) {
        throw new Error("User does not exist!");
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        lastUser.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Incorrect Password!");
      }

      return {
        token: users.createToken(lastUser, process.env.SECRET, "2hr"),
      };
    },

    // OWNER
    createOwner: async (root, { input }, ctx) => {
      const ownerExist = await Owner.findOne({
        num_document: input.num_document,
      });

      if (ownerExist) {
        throw new Error("Owner already exist");
      }

      try {
        const newOwner = new Owner(input);
        newOwner.userCreate = ctx._id;
        newOwner.userUpdate = ctx._id;
        return await newOwner.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateOwner: async (root, { input }, ctx) => {
      const { _id } = input;

      const owner = await Owner.findById({ _id });

      if (!owner) {
        throw new Error("Owner does not exist");
      }

      if (owner.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this Owner");
      }
      owner.userUpdate = ctx._id;
      return await Owner.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeOwner: async (root, { input }, ctx) => {
      const { _id } = input;
      const owner = await Owner.findById({ _id });

      if (!owner) {
        throw new Error("Owner does not exist");
      }

      if (owner.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this Owner");
      }

      await Owner.findOneAndDelete({ _id }, input);

      return "Owner deleted";
    },

    //PART
    createPart: async (_, args) => {
      const { id_part, cost } = args.input;

      const newPart = new Part({
        id_part,
        name_part,
        cost,
      });
      return await newPart.save();
    },

    updatePart: async (root, { input }, ctx) => {
      const { _id } = input;

      const part = await Part.findById({ _id });

      if (!part) {
        throw new Error("Part does not exist");
      }

      return await Part.findOneAndUpdate({ _id }, input, { new: true });
    },

    removePart: async (root, { input }, ctx) => {
      const { _id } = input;
      const part = await Part.findById({ _id });

      if (!part) {
        throw new Error("Part does not exist");
      }

      await Part.findOneAndDelete({ _id }, input);

      return "Part deleted";
    },

    //REPAIR
    createRepair: async (_, args) => {
      const {
        vehicle_state,
        cost,
        vehicle,
        id_spare_part,
        authorization,
      } = args.input;

      const newRepair = new Repair({
        vehicle_state,
        cost,
        vehicle,
        id_spare_part,
        authorization,
      });
      return await newRepair.save();
    },

    updateRepair: async (root, { input }, ctx) => {
      const { _id } = input;

      const repair = await Repair.findById({ _id });

      if (!repair) {
        throw new Error("Repair does not exist");
      }

      return await Repair.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeRepair: async (root, { input }, ctx) => {
      const { _id } = input;
      const repair = await Repair.findById({ _id });

      if (!repair) {
        throw new Error("Repair does not exist");
      }

      await Repair.findOneAndDelete({ _id }, input);

      return "Repair deleted";
    },

    // ROL
    createRol: async (_, args) => {
      const { id_rol, name_rol } = args.input;

      const newRol = new Rol({
        id_rol,
        name_rol,
      });
      return await newRol.save();
    },

    updateRol: async (root, { input }, ctx) => {
      const { _id } = input;

      const rol = await Rol.findById({ _id });

      if (!rol) {
        throw new Error("Rol does not exist");
      }

      return await Rol.findOneAndUpdate({ _id }, input, { new: true });
    },

    removePart: async (root, { input }, ctx) => {
      const { _id } = input;
      const rol = await Rol.findById({ _id });

      if (!rol) {
        throw new Error("Rol does not exist");
      }

      await Rol.findOneAndDelete({ _id }, input);

      return "Rol deleted";
    },

    // STATE
    createState: async (_, args) => {
      const { id_state, name_state } = args.input;

      const newState = new State({
        id_state,
        name_state,
      });
      return await newState.save();
    },

    updateState: async (root, { input }, ctx) => {
      const { _id } = input;

      const state = await State.findById({ _id });

      if (!state) {
        throw new Error("State does not exist");
      }

      return await State.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeState: async (root, { input }, ctx) => {
      const { _id } = input;
      const state = await State.findById({ _id });

      if (!state) {
        throw new Error("State does not exist");
      }

      await State.findOneAndDelete({ _id }, input);

      return "State deleted";
    },

    // TYPE
    createType: async (_, args) => {
      const { id_type, name_type } = args.input;

      const newType = new Type({
        id_type,
        name_type,
      });
      return await newType.save();
    },

    updateType: async (root, { input }, ctx) => {
      const { _id } = input;

      const type = await Type.findById({ _id });

      if (!type) {
        throw new Error("Type does not exist");
      }

      return await Type.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeType: async (root, { input }) => {
      const { _id } = input;
      const type = await Type.findById({ _id });

      if (!type) {
        throw new Error("Type does not exist");
      }

      await Type.findOneAndDelete({ _id }, input);

      return "Type deleted";
    },

    //VEHICLE
    createVehicle: async (root, { input }, ctx) => {
      const vehicule = { ...input };

      const type = await Type.findOne({ id_type: input.vehicle_type });

      vehicule.vehicle_type = type._id.toString();

      try {
        const newVehicle = new Vehicle(vehicule);
        newVehicle.userCreate = ctx._id;
        newVehicle.userUpdate = ctx._id;
        return await newVehicle.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateVehicle: async (root, { input }, ctx) => {
      const { _id } = input;

      const vehicle = await Vehicle.findById({ _id });

      if (!vehicle) {
        throw new Error("Vehicle does not exist");
      }

      if (vehicle.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this vehicle");
      }
      vehicle.userUpdate = ctx._id;
      return await Vehicle.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeVehicle: async (root, { input }, ctx) => {
      const { _id } = input;
      const vehicle = await Vehicle.findById({ _id });

      if (!vehicle) {
        throw new Error("Vehicle does not exist");
      }

      if (vehicle.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this vehicle");
      }

      await Vehicle.findOneAndDelete({ _id }, input);

      return "Vehicle deleted";
    },
  },
};

export default resolvers;
