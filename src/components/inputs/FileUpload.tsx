import { ChangeEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import { ButtonProps } from "./Button.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import IconButton from "./IconButton.tsx";
import Dialog from "../feedback/Dialog.tsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Props = {
  name: string;
  value?: any;
  accept?: "image/*" | "application/pdf";
  onChange?: (file: File | null) => void;
  error?: boolean;
} & Omit<ButtonProps, "startIcon" | "endIcon" | "htmlType">;

function FileUpload({
  variant = "contained",
  size = "medium",
  label = "Imagem do imóvel",
  type = "primary",
  disabled,
  accept = "image/*",
  onClick,
  value,
  name,
  onChange,
}: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target) {
      const file = event.target.files?.[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl((reader.result || "") as string);
      };

      onChange?.(file as File);
      file && reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    onChange?.(null);
  };
  return (
    <FlexRow aligned sx={{ gap: "10px" }}>
      <Button
        component="label"
        disabled={disabled}
        size={size}
        color={type}
        onClick={onClick}
        variant={variant}
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput
          key={imageUrl}
          name={name}
          value={value}
          onChange={handleFileUpload}
          disabled={disabled}
          accept={accept}
          type="file"
        />
      </Button>
      {imageUrl && (
        <FlexRow sx={{ gap: "0" }}>
          <IconButton
            onClick={() => setOpenPreview(true)}
            icon={<VisibilityIcon />}
          />
          <IconButton
            type="error"
            onClick={handleRemove}
            icon={<DeleteIcon />}
          />
        </FlexRow>
      )}
      <Dialog
        saveButton={false}
        cancelButton={false}
        open={openPreview}
        width="xs"
        onClose={() => setOpenPreview(false)}
      >
        <img
          src={imageUrl}
          style={{ width: "-webkit-fill-available" }}
          alt="Uploaded Image"
        />
      </Dialog>
    </FlexRow>
  );
}

export default FileUpload;
