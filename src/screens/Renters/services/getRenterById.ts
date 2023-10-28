import request from "../../../helpers/request.ts";
import Renter from "../../../models/Renter.ts";

function getRenterById(id: string): Promise<Renter> {
  return request({
    url: `renters/${id}`,
  });
}

export default getRenterById;
