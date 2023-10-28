import Renter from "../../../models/Renter.ts";
import request from "../../../helpers/request.ts";

type Params = {
  name?: string;
  business?: string;
};

function getRenters(params: Params): Promise<Renter[]> {
  return request({
    url: "renters",
    params,
  });
}

export default getRenters;
