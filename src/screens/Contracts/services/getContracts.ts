import request from "../../../helpers/request.ts";
import PropertyContract from "../../../models/PropertyContract.ts";
import { Paginated } from "../../../models/Paginated.ts";

export type Props = {
  page: number;
  pageSize?: number;
};

function getContracts(params: Props): Promise<Paginated<PropertyContract>> {
  return request({
    url: "properties-contracts",
    params,
  });
}

export default getContracts;
