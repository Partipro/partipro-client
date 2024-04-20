import BaseModel from "./BaseModel.ts";

export default interface User extends BaseModel {
  name: string;
  email: string;
  saasContract: string;
}
