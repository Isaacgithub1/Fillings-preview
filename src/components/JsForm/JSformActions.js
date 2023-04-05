import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, Stack, IconButton } from "@mui/material";
import {
  DeleteOutlined,
  CheckOutlined,
  SaveOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import axios from "axios";
import UseForm from "./UseForm";
import JSUpdateForm from "./Update Form/JSUpdateForm";

const JSformActions = ({ params, setEditId, editId, page }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const { handleDelete } = UseForm(params);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleEdit = (params) => {
    const editedRow = params.row;
    setLoading(true);
    axios
      .put(`http://127.0.0.1:8000/api/v1/job-support-data-update`, editedRow)
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    setEditId(null);
    setSuccess(true);
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
  return (
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
                  bgcolor: green[200],
                  height: "2.2vw",
                  marginTop: "3px",
                  "&:hover": { bgcolor: green[300] },
                }}
                onClick={() => {
                  setSuccess(false);
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
                  height: 40,
                }}
                disabled={params.id !== editId || loading}
                onClick={() => handleEdit(params)}
              >
                <SaveOutlined />
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

            <IconButton
              color="secondary"
              sx={{ boxShadow: 0 }}
              aria-label="edit"
              onClick={handleClickOpen}
            >
              <EditOutlined />
            </IconButton>
            <JSUpdateForm open={open} setOpen={setOpen} params={params} page={page} />
            <IconButton
              color="teritiary"
              sx={{ boxShadow: 0 }}
              size="small"
              aria-label="edit"
              onClick={handleDelete}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JSformActions;
