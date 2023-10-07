import request from "../../../helpers/request.ts";

type Props = {
  email: string;
  password: string;
  name: string;
};

function register(props: Props): Promise<{ token: string }> {
  return request<{ token: string }>({
    url: "auth/register",
    method: "POST",
    data: props,
    withCredentials: false,
  });
}

export default register;
