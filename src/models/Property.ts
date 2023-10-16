import BaseModel from "./BaseModel.ts";

export enum PropertyType {
  COMMERCIAL = "COMMERCIAL",
  RESIDENTIAL = "RESIDENTIAL",
}

export default interface Property extends BaseModel {
  name: string;
  monthRent: number;
  squareMeters: number;
  city: string;
  type: PropertyType;
  address: string;
  contract: string;
}
