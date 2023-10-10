import React, { useEffect, useMemo, useState } from "react";
import User from "../models/User.ts";
import useQuery from "../hooks/useQuery.tsx";
import getUser from "../services/user/getUser.ts";

type AuthContextProps = {
  isAuthenticated: boolean;
  user?: User;
  handleFetchUser: () => void;
  // logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  handleFetchUser: () => false,
  // logout: () => false,
});

type AuthContextProviderProps = { children: React.ReactNode };

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {
    isLoading: isFetchingUser,
    refetch: fetchUser,
    data: user,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useQuery({
    autoStart: false,
    service: getUser,
  });

  // const [, fetchLogout] = useService(logoutUser, {
  //   autoStart: false,
  //   onData: () => {
  //     setIsLoading(false);
  //     setIsAuthenticated(false);
  //     localStorage.clear();
  //     navigate("/auth/login", { replace: true });
  //   },
  // });

  useEffect(() => {
    if (isUserSuccess) {
      setIsAuthenticated(true);
    }
    if (isUserError) {
      setIsAuthenticated(false);
    }
  }, [isUserSuccess, isUserError]);

  useEffect(() => {
    fetchUser();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      handleFetchUser: fetchUser,
    }),
    [isAuthenticated, isFetchingUser, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {isFetchingUser ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuth = () => React.useContext(AuthContext);
