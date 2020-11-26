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
      return await Owner.find({ userCreate: ctx._id, userUpdate: ctx._id });
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
    vehicles: async (_, {}, ctx) => {
      return await Vehicle.find({ userCreate: ctx._id, userUpdate: ctx._id });
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

    createOwner: async (_, args) => {
      const {
        URLPhoto,
        num_document,
        name,
        last_name,
        email,
        phone,
        userCreate,
        userUpdate,
        vehicles,
      } = args.owner;

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

    createPart: async (_, args) => {
      const { id_part, cost } = args.part;

      const newPart = new Part({
        id_part,
        cost,
      });
      return await newPart.save();
    },

    createRepair: async (_, args) => {
      const {
        vehicle_state,
        cost,
        vehicle,
        id_spare_part,
        authorization,
      } = args.repair;

      const newRepair = new Repair({
        vehicle_state,
        cost,
        vehicle,
        id_spare_part,
        authorization,
      });
      return await newRepair.save();
    },

    createRol: async (_, args) => {
      const { id_rol, name_rol } = args.rol;

      const newRol = new Rol({
        id_rol,
        name_rol,
      });
      return await newRol.save();
    },

    createState: async (_, args) => {
      const { id_state, name_state } = args.state;

      const newState = new State({
        id_state,
        name_state,
      });
      return await newState.save();
    },

    createType: async (_, args) => {
      const { id_type, name_type } = args.type;

      const newType = new Type({
        id_type,
        name_type,
      });
      return await newType.save();
    },

    createVehicle: async (root, { input }, ctx) => {
      try {
        const vehicle = new Vehicle(input);
        console.log(ctx._id);
        vehicle.userCreate = ctx._id;
        vehicle.userUpdate = ctx._id;
        return await proyecto.save();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
