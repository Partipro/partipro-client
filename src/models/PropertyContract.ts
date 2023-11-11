import BaseModel from "./BaseModel.ts";
import Renter from "./Renter.ts";
import User from "./User.ts";

export default interface PropertyContract extends BaseModel {
  signedAt: string;
  active: boolean;
  owner: string | User;
  renter: Renter | string;
}
