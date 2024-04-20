import BaseModel from "./BaseModel.ts";
import Renter from "./Renter.ts";
import User from "./User.ts";
import Property from "./Property.ts";

export default interface PropertyContract extends BaseModel {
  signedAt: string;
  status: string;
  document: string;
  owner: string | User;
  renter: Renter | string;
  property: Property | string;
}
