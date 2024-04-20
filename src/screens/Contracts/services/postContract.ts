import request from "../../../helpers/request.ts";
import PropertyContract from "../../../models/PropertyContract.ts";

export type CreatePropertyContractProps = {
  property: string;
  renter: string;
  document: string;
  expiresAt: string;
};

type Field = keyof CreatePropertyContractProps;

function postContracts(
  data: CreatePropertyContractProps,
): Promise<PropertyContract> {
  const formData = new FormData();
  Object.keys(data).forEach((field: string) => {
    if (data && data[field as Field]) {
      formData.append(
        field,
        field === "document"
          ? data.document || ""
          : data[field as Field]?.toString() || "",
      );
    }
  });
  return request({
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "properties-contracts",
    data: formData,
  });
}

export default postContracts;
