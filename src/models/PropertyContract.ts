import BaseModel from "./BaseModel.ts";
import Renter from "./Renter.ts";
import User from "./User.ts";
import Property from "./Property.ts";

export enum PropertyContractStatus {
  AWAITING_SIGN = "AWAITING_SIGN",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export default interface PropertyContract extends BaseModel {
  signedAt: string;
  status: PropertyContractStatus;
  document: string;
  owner: string | User;
  renter: Renter | string;
  property: Property | string;
}
