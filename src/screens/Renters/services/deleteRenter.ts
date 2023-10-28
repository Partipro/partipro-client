import request from "../../../helpers/request.ts";
import Renter from "../../../models/Renter.ts";

function deleteRenter(id: string): Promise<Renter> {
  return request({
    url: `renters/${id}`,
    method: "delete",
  });
}

export default deleteRenter;
