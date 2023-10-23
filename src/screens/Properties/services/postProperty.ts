import Property, { PropertyType } from "../../../models/Property.ts";
import request from "../../../helpers/request.ts";

type Data = {
  name: string;
  type: PropertyType | "";
  city?: string;
  address?: string;
  squareMeters?: number;
  monthRent?: number;
  image?: string;
};

type Field = keyof Data;

function postProperty(data: Data): Promise<Property> {
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
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "properties",
    data: formData,
  });
}

export default postProperty;
