import Usuario from "../models/usuario";
import Proyecto from "../models/proyecto";
import Tarea from "../models/tarea";
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
    projects: async (_, {}, ctx) => {
      return await Proyecto.find({ creator: ctx._id });
    },
    users: async () => await Usuario.find(),

    getTasksByProjects: async (_, { input }, ctx) => {
      const { project } = input;

      const tasks = await Tarea.find({ creator: ctx._id })
        .where("project")
        .equals(project);
      return tasks;
    },
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

      const userExist = await Usuario.findOne({
        email,
      });

      if (userExist) {
        throw new Error("User already exist ");
      }

      try {
        const salt = await bcrypt.genSalt(10);
        input.password = await bcrypt.hash(password, salt);

        const newUser = new Usuario(input);
        await newUser.save();

        return "User Created";
      } catch (error) {
        console.log(error);
      }
    },

    authUser: async (root, { input }, ctx) => {
      const { email, password } = input;

      const lastUser = await Usuario.findOne({ email });

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

    newProject: async (root, { input }, ctx) => {
      try {
        const proyecto = new Proyecto(input);
        console.log(ctx._id);
        proyecto.creator = ctx._id;
        return await proyecto.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateProject: async (root, { input }, ctx) => {
      const { _id } = input;

      const project = await Proyecto.findById({ _id });

      if (!project) {
        throw new Error("Project does not exist");
      }

      if (project.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }

      return await Proyecto.findOneAndUpdate({ _id }, input, { new: true });
    },
    removeProject: async (root, { input }, ctx) => {
      const { _id } = input;

      const project = await Proyecto.findById({ _id });

      if (!project) {
        throw new Error("Project does not exist");
      }

      if (project.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }

      await Proyecto.findOneAndDelete({ _id }, input);

      return "Project deleted";
    },

    newTask: async (root, { input }, ctx) => {
      const { name } = input;
      const taskExist = await Tarea.findOne({
        name,
      });

      if (taskExist) {
        throw new Error("Task already exist ");
      }

      try {
        const task = new Tarea(input);
        task.creator = ctx._id;

        return await task.save();
      } catch (error) {
        console.log(error);
      }
    },
    updateTask: async (root, { input }, ctx) => {
      const { _id } = input;
      const task = await Tarea.findById({ _id });

      if (!task) {
        throw new Error("Task does not exist");
      }

      if (task.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this task");
      }

      return await Tarea.findOneAndUpdate({ _id }, input, { new: true });
    },
    removeTask: async (root, { input }, ctx) => {
      const { _id } = input;
      const task = await Tarea.findById({ _id });

      if (!task) {
        throw new Error("Task does not exist");
      }

      if (task.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this task");
      }

      await Tarea.findOneAndDelete({ _id }, input);

      return "Task deleted";
    },

    // OWNER
    createOwner: async (root, { input }, ctx) => {
      try {
        const owner = new Owner(input);
        console.log(ctx._id);
        owner.userCreate = ctx._id;
        owner.userUpdate = ctx._id;
        return await Owner.save();
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
      const { id_part, cost } = args.part;

      const part = new Part({
        id_part,
        name_part,
        cost,
      });
      return await part.save();
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
      } = args.repair;

      const repair = new Repair({
        vehicle_state,
        cost,
        vehicle,
        id_spare_part,
        authorization,
      });
      return await repair.save();
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
      const { id_rol, name_rol } = args.rol;

      const rol = new Rol({
        id_rol,
        name_rol,
      });
      return await rol.save();
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
      const { id_state, name_state } = args.state;

      const state = new State({
        id_state,
        name_state,
      });
      return await state.save();
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
      const { id_type, name_type } = args.type;

      const type = new Type({
        id_type,
        name_type,
      });
      return await type.save();
    },

    updateType: async (root, { input }, ctx) => {
      const { _id } = input;

      const type = await Type.findById({ _id });

      if (!type) {
        throw new Error("Type does not exist");
      }

      return await Type.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeType: async (root, { input }, ctx) => {
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
      try {
        const vehicle = new Vehicle(input);
        console.log(ctx._id);
        vehicle.userCreate = ctx._id;
        vehicle.userUpdate = ctx._id;
        return await Vehicle.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateVehicle: async (root, { input }, ctx) => {
      const { _id } = input;

      const vehicle = await Vehicle.findById({ _id });

      if (!vehicle) {
        throw new Error("Project does not exist");
      }

      if (vehicle.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }
      vehicle.userUpdate = ctx._id;
      return await Vehicle.findOneAndUpdate({ _id }, input, { new: true });
    },

    removeVehicle: async (root, { input }, ctx) => {
      const { _id } = input;
      const vehicle = await Vehicle.findById({ _id });

      if (!vehicle) {
        throw new Error("Task does not exist");
      }

      if (vehicle.userCreate.toString() !== ctx._id) {
        throw new Error("You are not the creator of this task");
      }

      await Vehicle.findOneAndDelete({ _id }, input);

      return "Task deleted";
    },
  },
};

export default resolvers;
