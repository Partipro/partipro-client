import request from "../../../helpers/request.ts";

function sendContract(id: string): Promise<void> {
  return request({
    url: `properties-contracts/${id}/send`,
    method: "HEAD",
  });
}

export default sendContract;
