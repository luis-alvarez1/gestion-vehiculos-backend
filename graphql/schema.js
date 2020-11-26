import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    projects: [Project!]!
    users: [User!]!
    getTasksByProjects(input: IDProjectInput): [Task!]!
    owners: [Owner!]!
    parts: [Part!]!
    repairs: [Repair!]!
    rols: [Rol!]!
    types: [Type!]!
    vehicles: [Vehicle!]!
    states: [State!]!
  }

  type Mutation {
    "USUARIOS"
    createUser(input: UsuarioInput): String
    authUser(input: AuthInput): Token

    "PROYECTOS"
    newProject(input: ProjectInput): Project
    updateProject(input: UpdateProjectInput): Project
    removeProject(input: RemoveProjectInput): String

    "TAREAS"
    newTask(input: TaskInput): Task
    updateTask(input: TaskInputUpdate): Task
    removeTask(input: TaskInputRemove): String

    "OWNERS"
    createOwner(owner: OwnerInput): Owner

    "PARTS"
    createPart(part: PartInput): Part

    "REPAIRS"
    createRepair(repair: RepairInput): Repair

    "ROLS"
    createRol(rol: RolInput): Rol

    "STATES"
    createState(state: StateInput): State

    "TYPES"
    createType(type: TypeInput): Type

    "VEHICLES"
    createVehicle(vehicle: VehicleInput): Vehicle
    updateVehicle(vehicle: VehicleInputUpdate): Vehicle
  }

  "TYPE"
  type Token {
    token: String!
  }

  type Task {
    _id: ID!
    name: String!
    state: Boolean
    project: String!
  }

  type User {
    name: String!
    email: String!
  }
  type Project {
    _id: ID!
    name: String!
    creator: ID!
  }

  type Owner {
    _id: ID!
    URLPhoto: String!
    num_document: String!
    name: String!
    last_name: String!
    email: String!
    phone: Int!
    userCreate: ID!
    userUpdate: ID!
    vehicles: ID!
  }

  type Part {
    _id: ID!
    id_part: Int!
    cost: Int!
  }

  type Repair {
    _id: ID!
    vehicle_state: ID!
    cost: Int!
    vehicle: ID!
    id_spare_part: ID!
    authorization: Boolean!
  }

  type Rol {
    _id: ID!
    id_rol: Int!
    name_rol: String!
  }

  type State {
    _id: ID!
    id_state: Int!
    name_state: String!
  }

  type Type {
    _id: ID!
    id_type: Int!
    name_type: String!
  }

  type Vehicle {
    _id: ID!
    vehicle_registration: String!
    vehicle_brand: String!
    vehicle_model: String!
    color: String!
    vehicle_state: ID!
    owner: ID!
    vehicle_type: ID!
    userCreate: ID!
    userUpdate: ID!
  }

  "INPUT"
  input UsuarioInput {
    name: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input ProjectInput {
    name: String!
  }
  input UpdateProjectInput {
    _id: ID
    name: String
  }
  input RemoveProjectInput {
    _id: ID!
  }
  input IDProjectInput {
    project: String!
  }
  input TaskInput {
    name: String!
    project: String!
  }

  input TaskInputUpdate {
    _id: ID!
    name: String
    project: String
    state: Boolean
  }

  input TaskInputRemove {
    _id: ID!
  }

  input OwnerInput {
    URLPhoto: String!
    num_document: String!
    name: String!
    last_name: String!
    email: String!
    phone: Int!
  }

  input PartInput {
    _id: ID!
    id_part: Int!
    cost: Int!
  }

  input RepairInput {
    _id: ID!
    cost: Int!
    authorization: Boolean!
  }

  input RolInput {
    _id: ID!
    id_rol: Int!
    name_rol: String!
  }

  input StateInput {
    _id: ID!
    id_state: Int!
    name_state: String!
  }

  input TypeInput {
    _id: ID!
    id_type: Int!
    name_type: String!
  }

  input VehicleInput {
    _id: ID!
    vehicle_registration: String!
    vehicle_brand: String!
    vehicle_model: String!
    color: String!
  }

  input VehicleInputUpdate {
    _id: ID
    name: String
    vehicle_registration: String!
    vehicle_brand: String!
    vehicle_model: String!
    color: String!
  }
`;
export default typeDefs;
