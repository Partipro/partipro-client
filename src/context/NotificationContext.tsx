import React, { useCallback, useMemo, useState } from "react";
import Snackbar from "../components/feedback/Snackbar.tsx";

type NotificationContextProps = {
  notification: ({
    message,
    type,
  }: {
    message: string;
    type: "error" | "success";
  }) => any;
};

const NotificationContext = React.createContext<NotificationContextProps>({
  notification: ({}) => false,
});

type NotificationContextProviderProps = { children: React.ReactNode };

function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notificationData, setNotificationData] = useState<{
    message?: string;
    type?: "error" | "success";
  }>({});

  const handleNotification = useCallback(
    ({ message, type }: { message: string; type: "error" | "success" }) => {
      setNotificationData({ message, type });
    },
    [],
  );

  const value = useMemo(
    () => ({
      notification: handleNotification,
    }),
    [notificationData],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notificationData?.type && notificationData?.message ? (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => setNotificationData({})}
          message={notificationData.message}
          type={notificationData.type}
        />
      ) : null}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;

export const useNotification = () => React.useContext(NotificationContext);
