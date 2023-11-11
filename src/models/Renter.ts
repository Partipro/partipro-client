import BaseModel from "./BaseModel.ts";

export default interface Renter extends BaseModel {
  name: string;
  contract: string;
  business: string;
}