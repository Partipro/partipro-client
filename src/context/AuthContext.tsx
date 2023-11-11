import React, { useEffect, useMemo, useState } from "react";
import User from "../models/User.ts";
import useQuery from "../hooks/core/useQuery.tsx";
import getUser from "../services/user/getUser.ts";
import logout from "../services/auth/logout.ts";

type AuthContextProps = {
  isAuthenticated: boolean;
  user?: User;
  handleFetchUser: () => void;
  handleLogout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  handleFetchUser: () => false,
  handleLogout: () => false,
});

type AuthContextProviderProps = { children: React.ReactNode };

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {
    isLoading: isFetchingUser,
    refetch: fetchUser,
    data: user,
  } = useQuery({
    autoStart: false,
    service: async () => {
      const user = await getUser();

      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      return user;
    },
  });

  const { refetch: logoutUser } = useQuery({
    autoStart: false,
    queryKey: ["logout", undefined],
    service: async () => {
      const loggedOut = await logout();

      if (loggedOut) {
        setIsAuthenticated(false);
      }

      return loggedOut;
    },
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      handleFetchUser: fetchUser,
      handleLogout: logoutUser,
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
