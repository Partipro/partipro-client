import request from "../../helpers/request.ts";
import User from "../../models/User.ts";

function getUser(): Promise<User> {
  return request({
    url: "users",
  });
}

export default getUser;
