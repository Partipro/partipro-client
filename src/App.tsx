import useService from "./hooks/useService.tsx";
import request from "./helpers/request.ts";

type Response = { name: string; email: string };

const getUsers = (): Promise<Response[]> => {
  return request<Response[]>({
    url: "users",
    withCredentials: false,
  });
};

function App() {
  const [loading, data] = useService({
    service: getUsers,
  });

  console.log(loading);
  return <div>{data?.map((d) => d.name)}oioio</div>;
}

export default App;
