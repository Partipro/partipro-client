import BaseModel from "./BaseModel.ts";

export default interface Renter extends BaseModel {
  name: string;
  saasContract: string;
  business: string;
  email: string;
  password: string;
}
