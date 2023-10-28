import request from "../../../helpers/request.ts";
import Renter from "../../../models/Renter.ts";

export type UpdateRenterProps = {
  name?: string;
  business?: string;
};

function updateRenter({
  id,
  data,
}: {
  data: UpdateRenterProps;
  id: string;
}): Promise<Renter> {
  return request({
    method: "put",
    url: `renters/${id}`,
    data: data,
  });
}

export default updateRenter;
