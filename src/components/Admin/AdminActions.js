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
import Fade from "react-reveal/Fade";
import {
  CheckOutlined,
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useValue } from "../../Context/ContextProvider";
import { inputBoxAdminAction } from "../Utils/MuiStyles";
import { ServiceFileForm, getSteps } from "./Services";
import UserInfoForm from "./Forms/UserInfoForm";
import ServiceInfoForm from "./Forms/ServiceInfoForm";
import { getRequests } from "../../Context/actions";
import SnackBar from "../Utils/SnakeBar";
import { useNavigate } from "react-router-dom";

export const UsersActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userinfo, setInfo] = useState(params.row);
  const [sbOpen, setsbOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [output, setOutput] = React.useState({});
  const steps = getSteps();

  // console.log("user info details", userinfo);
  let value = userinfo;
  const handleFormClose = () => {
    if(window.confirm("Discard Changes")){
    setOpen(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    const endpoints = {
      GST: "req-service-gst",
      "GST Registration": "req-service-gst-rgst",
      "PAN Registration": "req-service-pan-rgst",
      "TAX Registration": "req-service-tax-rgst",
    };

    const endpoint = endpoints[userinfo.enquired_for];

    if (endpoint) {
      fetch(`http://localhost:8000/api/v1/${endpoint}/${params.row.req_id}`)
        .then((res) => res.json())
        .then((result) => {
          setOutput(result);
        });
    }
    console.log(output);
  };
  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleReset = () => setActiveStep(0);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      secondary: {
        main: "#094067",
      },
      teritiary: {
        main: "#ef4565",
      },
    },
  });

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

  const handleClose = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const compHandleClose = () => {
    setOpen(false);
  };

  const sbhandleClose = () => {
    setsbOpen(false);
  };

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

  const handleFormSubmit = async () => {
    setOpen(false);
    console.log("user1", output);
    const endpoints = {
      GST: "/gst-update",
      "GST Registration": "/gst-rgst-update",
      "PAN Registration": "/pan-rgst-update",
      "TAX Registration": "/tax-rgst-update",
    };

    const endpoint = endpoints[userinfo.enquired_for];
    const API_ENDPOINT = "http://localhost:8000/api/v1";

    console.log("user2", userinfo);
    fetch(`${API_ENDPOINT}/req-data-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userinfo),
    });

    if (endpoint) {
      fetch(`${API_ENDPOINT}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(output),
      });
    }
    setsbOpen(true);
    getRequests(dispatch);
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
    // if (rowId !==  params.id && success ===false) window.alert("Please save you changes");
  }, [rowId]);
  const navigate = useNavigate();
  // console.log("setoutput", output);
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <UserInfoForm {...{ params }} setInfo={setInfo} userinfo={userinfo} />
        );
      case 1:
        return (
          <ServiceInfoForm
            userinfo={userinfo}
            output={output}
            setOutput={setOutput}
          />
        );
      case 2:
        return <ServiceFileForm />;
    }
  }

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
                disabled={params.id !== rowId || loading}
                onClick={handleSubmit}
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
            <Dialog
              scroll={"body"}
              fullWidth
              maxWidth={"md"}
              open={open}
              onClose={handleFormClose}
            >
              <DialogTitle
                sx={{
                  fontFamily: "PT Sans Caption",
                  fontSize: "18px",
                  margin: "30px",
                  fontWeight: "500",
                  position: "relative",
                  color: "#ef4565",
                }}
              >
                Update Form
              </DialogTitle>
              <DialogContent sx={{ width: "900px", height: "450px" }}>
                <DialogContentText></DialogContentText>
                <Box>
                  <ThemeProvider theme={theme}>
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      connector={<QontoConnector />}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    <Box mt={2}>
                      {activeStep === steps.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "60px",
                          }}
                        >
                          <Typography>
                            All steps completed , Do you wanna go back? , else
                            update below!
                          </Typography>

                          <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                          >
                            Go Back
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={inputBoxAdminAction}>
                          {getStepContent(activeStep)}
                          <div
                            style={{
                              position: "absolute",
                              left: "20px",
                              width: "100%",
                              display: "flex",
                              marginTop: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <Stack spacing={40} direction="row">
                              <Button
                                variant="contained"
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleClose}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                              >
                                {activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </Stack>
                          </div>
                        </Box>
                      )}
                    </Box>
                  </ThemeProvider>
                </Box>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={compHandleClose}>Cancel</Button>
                <Button type="submit" onClick={handleFormSubmit}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
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
        {/* <SnackBar open={open} setOpen={setOpen} /> */}
      </ThemeProvider>
    </>
  );
};
