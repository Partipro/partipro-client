import Property, { PropertyType } from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

type Data = {
  name?: string;
  type?: PropertyType | "";
  city?: string;
  address?: string;
  squareMeters?: number;
  monthRent?: number;
  image?: string;
};

type Field = keyof Data;

function updateProperty({
  id,
  data,
}: {
  data: Data;
  id: string;
}): Promise<Property> {
  const formData = new FormData();
  Object.keys(data).forEach((field: string) => {
    if (data && data[field as Field]) {
      formData.append(
        field,
        field === "image"
          ? data.image || ""
          : data[field as Field]?.toString() || "",
      );
    }
  });
  return request({
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `properties/${id}`,
    data: formData,
  });
}

export default updateProperty;
