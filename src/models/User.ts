import BaseModel from "./BaseModel.ts";

export enum Roles {
  ADMIN = "ADMIN",
  RENTER = "RENTER",
}

export default interface User extends BaseModel {
  name: string;
  email: string;
  saasContract: string;
  role: Roles;
}
