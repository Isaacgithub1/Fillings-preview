import React, { useState } from "react";
import QontoConnector from "../Utils/StepperUtils";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Stack, IconButton } from "@mui/material";
import {
  CheckOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useValue } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

// import UseForm from "./UseForms";
export const UsersActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#094067",
        },
        green: {
          main: "#094067",
        },
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
      },
    });

  const { dispatch } = useValue();

  const handleDelete = async () => {
    const data = params.row;
    if (window.confirm("Are you sure to delete this record?")) {
      const result = await fetch(
        "http://localhost:8000/api/v1/req-data-delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const id = await result.json();
      dispatch({ type: "DELETE_REQUESTS", payload: id });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = params.row;
    const result = await fetch("http://localhost:8000/api/v1/req-data-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return isLogged ? (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <Box
          sx={{
            m: 0.5,
            position: "relative",
          }}
        >
          <Stack spacing={0} direction="row">
            {success ? (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  boxShadow: 0,
                  bgcolor: green[500],
                  "&:hover": { bgcolor: green[700] },
                }}
              >
                <CheckOutlined />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  width: 40,
                  // boxShadow: 0,
                  height: 40,
                }}
                disabled={params.id !== rowId || loading}
                onClick={handleSubmit}
              >
                <SaveOutlined />
                {/* <Icon icon={"eva:save-outline"} /> */}
              </IconButton>
            )}
            {loading && (
              <CircularProgress
                size={40}
                sx={{
                  color: green[500],
                  position: "absolute",
                  //   top: -6,
                  left: -1,
                  zIndex: 1,
                }}
              />
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  ) : (
    login()
  );
};
