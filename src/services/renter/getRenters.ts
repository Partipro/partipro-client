import Renter from "../../models/Renter.ts";
import request from "../../helpers/request.ts";

export type RentersSearchParams = {
  criteria?: string;
  business?: string;
};

function getRenters(params: RentersSearchParams): Promise<Renter[]> {
  return request({
    url: "renters",
    params,
  });
}

export default getRenters;
