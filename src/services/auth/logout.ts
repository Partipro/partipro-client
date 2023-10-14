import request from "../../helpers/request.ts";

function logout(): Promise<null> {
  return request({
    url: "auth/logout",
  });
}

export default logout;
