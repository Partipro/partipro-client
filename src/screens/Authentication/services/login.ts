import request from "../../../helpers/request.ts";

type Props = {
  email: string;
  password: string;
};

function login(props: Props): Promise<{ token: string }> {
  return request<{ token: string }>({
    url: "auth",
    method: "POST",
    data: props,
  });
}

export default login;
