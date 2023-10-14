import React from "react";
import MuiDialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../inputs/Button.tsx";
import useMediaQuery, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../../hooks/useMediaQuery.tsx";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  saveButton?:
    | {
        label: string;
      }
    | boolean;
  cancelButton?:
    | {
        label: string;
      }
    | boolean;
};

function Dialog({
  title,
  children,
  onClose,
  saveButton = { label: "Save" },
  cancelButton = { label: "Cancel" },
  ...props
}: Props) {
  const [isDesktop] = useMediaQuery(MEDIA_QUERY_BREAKPOINTS.MD);

  return (
    <MuiDialog
      maxWidth="md"
      onClose={onClose}
      fullWidth
      fullScreen={!isDesktop}
      {...props}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {cancelButton && (
          <Button
            variant="text"
            onClick={onClose}
            label={(cancelButton as { label: string }).label}
          />
        )}
        {saveButton && (
          <Button
            htmlType="submit"
            label={(saveButton as { label: string }).label}
          />
        )}
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
