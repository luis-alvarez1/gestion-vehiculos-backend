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

    "OWNERS"
    createOwner(owner: OwnerInput): Owner
    updateOwner(owner: OwnerInputUpdate): Owner
    removeOwner(owner: OwnerInputRemove): String

    "PARTS"
    createPart(part: PartInput): Part
    updatePart(part: PartInputUpdate): Part
    removePart(part: PartInputRemove): String

    "REPAIRS"
    createRepair(repair: RepairInput): Repair
    updateRepair(repair: RepairInputUpdate): Repair
    removeRepair(repair: RepairInputRemove): String

    "ROLS"
    createRol(rol: RolInput): Rol
    updateRol(rol: RolInputUpdate): Rol
    removeRol(rol: RolInputRemove): String

    "STATES"
    createState(state: StateInput): State
    updateState(state: StateInputUpdate): State
    removeState(state: StateInputRemove): String

    "TYPES"
    createType(type: TypeInput): Type
    updateType(type: TypeInputUpdate): Type
    removeType(type: TypeInputRemove): String

    "VEHICLES"
    createVehicle(vehicle: VehicleInput): Vehicle
    updateVehicle(vehicle: VehicleInputUpdate): Vehicle
    removeVehicle(vehicle: VehicleInputRemove): String
  }

  "TYPE"
  type Token {
    token: String!
  }

  type User {
    name: String!
    last_name: String!
    phone: Int!
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
    phone: Int!
    userCreate: ID!
    userUpdate: ID!
    vehicles: ID!
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
  input UserInput {
    name: String!
    last_name: String!
    phone: Int!
    rol_id: ID!
    salario: Int!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  "OWNER"
  input OwnerInput {
    URLPhoto: String!
    num_document: String!
    name: String!
    last_name: String!
    email: String!
    phone: Int!
    vehicles: ID!
  }

  input OwnerInputUpdate {
    _id: ID!
    URLPhoto: String
    num_document: String
    name: String
    last_name: String
    email: String
    phone: Int
    vehicles: ID
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
    vehicle: ID!
    id_spare_part: ID!
    authorization: Boolean!
  }

  input RepairInputUpdate {
    _id: ID!
    vehicle_state: ID
    cost: Int
    vehicle: ID
    id_spare_part: ID
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
    vehicle_state: ID!
    owner: ID!
    vehicle_type: ID!
  }

  input VehicleInputUpdate {
    _id: ID!
    vehicle_registration: String
    vehicle_brand: String
    vehicle_model: String
    color: String
    vehicle_state: ID
    owner: ID
    vehicle_type: ID
  }

  input VehicleInputRemove {
    _id: ID!
  }

  input IDOwnerInput {
    _id: ID!
  }
`;
export default typeDefs;
