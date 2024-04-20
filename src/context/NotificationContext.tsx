import React, { useCallback, useMemo, useState } from "react";
import Snackbar from "../components/feedback/Snackbar.tsx";
import Dialog from "../components/feedback/Dialog.tsx";

type DialogProps = {
  saveButton?:
    | {
        label?: string;
        onClick?: () => void;
      }
    | boolean;
  cancelButton?:
    | {
        label: string;
      }
    | boolean;
  content?: React.ReactNode;
  title?: string;
  onClose?: () => void;
};

type NotificationContextProps = {
  notification: ({
    message,
    type,
  }: {
    message: string;
    type: "error" | "success";
  }) => any;
  dialog: ({
    title,
    content,
    onClose,
    saveButton,
    cancelButton,
  }: DialogProps) => any;
};

const NotificationContext = React.createContext<NotificationContextProps>({
  notification: ({}) => false,
  dialog: ({}) => false,
});

type NotificationContextProviderProps = { children: React.ReactNode };

function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notificationData, setNotificationData] = useState<{
    message?: string;
    type?: "error" | "success";
  }>({});
  const [dialogData, setDialogData] = useState<DialogProps | null>(null);

  const handleNotification = useCallback(
    ({ message, type }: { message: string; type: "error" | "success" }) => {
      setNotificationData({ message, type });
    },
    [],
  );

  const handleDialog = useCallback((props: DialogProps) => {
    setDialogData(props);
  }, []);

  const value = useMemo(
    () => ({
      notification: handleNotification,
      dialog: handleDialog,
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
      <Dialog
        open={!!dialogData}
        isAlert
        saveButton={dialogData?.saveButton}
        cancelButton={dialogData?.cancelButton}
        width="sm"
        title={dialogData?.title}
        onClose={() => {
          dialogData?.onClose?.();
          setDialogData(null);
        }}
      >
        {dialogData?.content}
      </Dialog>
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;

export const useNotification = () => React.useContext(NotificationContext);
