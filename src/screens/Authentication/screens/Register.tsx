import useMutation from "../../../hooks/useMutation.tsx";
import register from "../services/register.ts";
import { useEffect, useState } from "react";
import Button from "../../../components/inputs/Button.tsx";

function Register() {
  const [count, setCount] = useState(0);
  const [doRegister] = useMutation({
    service: register,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    if (count) {
      doRegister.mutate({
        name: "Gabriel",
        email: "mutate@test.com",
        password: "124",
      });
    }
  }, [count]);
  return (
    <div>
      <>register screen</>
      <Button onClick={() => setCount(count + 1)} label="Click me!" />
    </div>
  );
}

export default Register;
