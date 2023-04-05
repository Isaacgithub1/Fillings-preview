import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, Stack, IconButton } from "@mui/material";
import {
  DeleteOutlined,
  CheckOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import UseForm from "./UseForm";
import { useValue } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EnqFormActions = ({ params,setEditId, editId }) => {
  const { handleDelete } = UseForm(params);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    state: { isLogged },
  } = useValue();
  const login = () => {
    navigate("/login");
  };
  const handleEdit = (params) => {
    const editedRow = params.row;
    setLoading(true);
    axios
      .put(`http://127.0.0.1:8000/api/v1/course-enquiry-update`, editedRow)
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

  useEffect(() => {
    if (editId === params.id && success) {
      setSuccess(false);
    }
  }, [editId]);

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
                onClick={() => {
                  handleEdit(params);
                }}
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
  ) : (
    login()
  );
};

export default EnqFormActions;
