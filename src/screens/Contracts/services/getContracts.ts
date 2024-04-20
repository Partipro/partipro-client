import request from "../../../helpers/request.ts";
import PropertyContract from "../../../models/PropertyContract.ts";
import { Paginated } from "../../../models/Paginated.ts";

export type ContractsSearchParams = {
  status?: string;
  signedAt?: string;
};

export type Props = {
  page: number;
  pageSize?: number;
};

function getContracts(
  params: Props & ContractsSearchParams,
): Promise<Paginated<PropertyContract>> {
  return request({
    url: "properties-contracts",
    params,
  });
}

export default getContracts;
