import request from "../../../helpers/request.ts";
import Renter from "../../../models/Renter.ts";

export type CreateRenterProps = {
  name: string;
  business?: string;
};

function postRenter(data: CreateRenterProps): Promise<Renter> {
  return request({
    method: "post",
    url: "renters",
    data: data,
  });
}

export default postRenter;
