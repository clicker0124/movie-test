import React from "react";
import { Snackbar, Alert } from "@mui/material";

type AlertDialogProps = {
  open: boolean;
  onClose: () => void;
  severity: "error" | "warning" | "info" | "success";
  message: string;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  severity,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default AlertDialog;
