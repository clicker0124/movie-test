import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "./styles/theme";
import Navbar from "./components/shared/NavigationBar";
import MovieList from "./components/Movie/MovieList";
import ReviewList from "./components/Review/ReviewList";
import AlertDialog from "./components/shared/AlertDialog";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Container } from "@mui/material";
import { SeverityType } from "./types";

export type DialogProps = {
  severity: SeverityType;
  message: string;
};

function App() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [alertDialogProps, setAlertDialogProps] = useState<DialogProps>({
    message: "",
    severity: "info",
  });

  const handleShowAlertDialog = (
    message: string,
    severity: DialogProps["severity"]
  ) => {
    setAlertDialogProps({ message, severity });
    setShowAlertDialog(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to={"/movies"} />} />
          <Route
            path="/movies"
            element={<MovieList showAlertDialog={handleShowAlertDialog} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/movie/:movieId"
            element={<ReviewList showAlertDialog={handleShowAlertDialog} />}
          />
        </Routes>
      </Container>
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        severity={alertDialogProps.severity}
        message={alertDialogProps.message}
      />
    </ThemeProvider>
  );
}

export default App;
