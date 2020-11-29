import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User!]!
    owners: [Owner!]!
    parts: [Part!]!
    repairs: [Repair!]!
    rols: [Rol!]!
    types: [Type!]!
    vehicles: [Vehicle!]!
    getVehiclesByOwner(input: IDOwnerInput): [Vehicle!]!
    states: [State!]!
  }

  type Mutation {
    "USUARIOS"
    createUser(input: UserInput): String
    authUser(input: AuthInput): Token
    updateUser(input: UserInputUpdate): String
    removeUser(input: UserInputRemove): String

    "OWNERS"
    createOwner(input: OwnerInput): Owner
    updateOwner(input: OwnerInputUpdate): Owner
    removeOwner(input: OwnerInputRemove): String

    "PARTS"
    createPart(input: PartInput): Part
    updatePart(input: PartInputUpdate): Part
    removePart(input: PartInputRemove): String

    "REPAIRS"
    createRepair(input: RepairInput): Repair
    updateRepair(input: RepairInputUpdate): Repair
    removeRepair(input: RepairInputRemove): String

    "ROLS"
    createRol(input: RolInput): Rol
    updateRol(input: RolInputUpdate): Rol
    removeRol(input: RolInputRemove): String

    "STATES"
    createState(input: StateInput): State
    updateState(input: StateInputUpdate): State
    removeState(input: StateInputRemove): String

    "TYPES"
    createType(input: TypeInput): Type
    updateType(input: TypeInputUpdate): Type
    removeType(input: TypeInputRemove): String

    "VEHICLES"
    createVehicle(input: VehicleInput): Vehicle
    updateVehicle(input: VehicleInputUpdate): Vehicle
    removeVehicle(input: VehicleInputRemove): String
  }

  "TYPE"
  type Token {
    token: String!
  }

  type User {
    name: String!
    last_name: String!
    phone: String!
    rol_id: ID!
    salario: Int!
    email: String!
  }

  type Owner {
    _id: ID!
    URLPhoto: String!
    num_document: String!
    name: String!
    last_name: String!
    email: String!
    phone: String!
    userCreate: ID!
    userUpdate: ID!
    vehicles: [ID!]
  }

  type Part {
    _id: ID!
    id_part: Int!
    name_part: String!
    cost: Int!
  }

  type Repair {
    _id: ID!
    vehicle_state: ID!
    cost: Int!
    vehicle: ID!
    id_spare_part: Int!
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
    vehicle_state: Int!
    owner: ID!
    vehicle_type: Int!
    userCreate: ID!
    userUpdate: ID!
  }

  "INPUT"
  input UserInput {
    name: String!
    last_name: String!
    phone: String!
    rol_id: Int!
    salario: Int!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input UserInputUpdate {
    _id: ID!
    name: String
    last_name: String
    phone: String
    rol_id: Int
    salario: Int
    email: String
    password: String
  }

  input UserInputRemove {
    _id: ID!
  }

  "OWNER"
  input OwnerInput {
    URLPhoto: String!
    num_document: String!
    name: String!
    last_name: String!
    email: String!
    phone: String!
  }

  input OwnerInputUpdate {
    _id: ID!
    URLPhoto: String
    num_document: String
    name: String
    last_name: String
    email: String
    phone: String
  }

  input OwnerInputRemove {
    _id: ID!
  }

  "PART"
  input PartInput {
    id_part: Int!
    name_part: String!
    cost: Int!
  }

  input PartInputUpdate {
    _id: ID
    id_part: Int
    name_part: String
    cost: Int
  }

  input PartInputRemove {
    _id: ID
  }

  "REPAIR"
  input RepairInput {
    vehicle_state: ID!
    cost: Int!
    vehicle: Int!
    id_spare_part: Int!
    authorization: Boolean!
  }

  input RepairInputUpdate {
    _id: ID!
    vehicle_state: ID
    cost: Int
    vehicle: Int
    id_spare_part: Int
    authorization: Boolean
  }

  input RepairInputRemove {
    _id: ID!
  }

  "ROL"
  input RolInput {
    id_rol: Int!
    name_rol: String!
  }

  input RolInputUpdate {
    _id: ID!
    id_rol: Int!
    name_rol: String
  }

  input RolInputRemove {
    _id: ID!
  }

  "STATE"
  input StateInput {
    id_state: Int!
    name_state: String!
  }

  input StateInputUpdate {
    _id: ID!
    id_state: Int
    name_state: String
  }

  input StateInputRemove {
    _id: ID!
  }

  "TYPE"
  input TypeInput {
    id_type: Int!
    name_type: String!
  }

  input TypeInputUpdate {
    _id: ID!
    id_type: Int
    name_type: String
  }

  input TypeInputRemove {
    _id: ID!
  }

  "VEHICLE"
  input VehicleInput {
    vehicle_registration: String!
    vehicle_brand: String!
    vehicle_model: String!
    color: String!
    vehicle_state: Int!
    owner: ID
    vehicle_type: Int!
  }

  input VehicleInputUpdate {
    _id: ID!
    vehicle_registration: String
    vehicle_brand: String
    vehicle_model: String
    color: String
    vehicle_state: Int
    owner: ID
    vehicle_type: Int
  }

  input VehicleInputRemove {
    _id: ID!
  }

  input IDOwnerInput {
    _id: ID!
  }
`;
export default typeDefs;
