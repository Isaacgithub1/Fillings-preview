import React from "react";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import green from "@material-ui/core/colors/green";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import UseForm from "./UseForm";
import { useValue } from "../../Context/ContextProvider";
import Fade from "react-reveal/Fade";
import { Alert } from "@material-ui/lab";
import SnackBar from "../Utils/SnakeBar";
const JobSupportForm = () => {
  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    clearFields,
    open,
    setOpen,
    handleClose,
  } = UseForm();
  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const inputBox = {
    margin: "0 auto",
    width: "100%",
    "& .MuiAlert-icon": {
      color: "white !important", // replace with your desired color
    },
    "& .MuiTextField-root": {
      m: 1.5,
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "23ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#fffffe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
    },
    justifyContent: "center",
    flexGrow: 1,
    position: "relative",
    borderRadius: "10px",
    padding: "30px 20px 0 30px",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2FA0A4",
      },
      green: {
        main: "#094067",
      },
      success: {
        main: green[600],
      },
    },
  });

  const statusvalues = [
    "Cannot Provide Support",
    "Confrimed",
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
    "Follow Up",
    "Not Interested",
    "Resource Not Available",
    "Waiting For Response",
  ];

  return isLogged ? (
    <>
      <Paper elevation={3} sx={inputBox}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            right: "3px",
            width: "100%",
            paddingBottom: "5px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography
              variant="h6"
              color={"#ef4565"}
              sx={{
                padding: "4px",
                fontWeight: "bold",
                fontSize: "23px",
                flexGrow: 1,
                fontFamily: "Nunito Sans",
              }}
              noWrap
              component="h3"
            >
              Job Support Form
            </Typography>

            <Typography
              variant="p"
              color={"#000000"}
              sx={{
                paddingLeft: "4px",
                fontWeight: "400",
                fontSize: "15px",
                opacity: ".8",
                flexGrow: 1,
                fontFamily: "Nunito Sans",
              }}
              noWrap
              component="h3"
            >
              Submit your form with your details
            </Typography>
          </div>
          <ThemeProvider theme={theme}>
            <ValidatorForm
              // instantValidate
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <Grid
                style={{
                  right: "10px",
                  paddingTop: "10px",
                  "& .MuiTypographyH6": {
                    fontSize: "12px",
                    lineHeight: "35px",
                    fontWeight: "600",
                  },
                  flexDirection: "column",
                  position: "relative",
                }}
                container
                direction="row"
                justify="center"
                alignItems="inherit"
              >
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Candidate name"
                    size="small"
                    color="green"
                    type="text"
                    name="candidate_name"
                    required={true}
                    value={values.candidate_name}
                    onChange={handleChange}
                  />

                  <TextValidator
                    label="Technology"
                    size="small"
                    color="green"
                    type="text"
                    name="technology"
                    required={true}
                    value={values.technology}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Resource"
                    size="small"
                    color="green"
                    type="text"
                    name="resource"
                    required={true}
                    value={values.resource}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Mobile"
                    size="small"
                    color="green"
                    type="number"
                    name="mobile"
                    required={true}
                    value={values.mobile}
                    onChange={handleChange}
                    validators={["required", "matchRegexp:^[1-9][0-9]{9}$"]}
                    errorMessages={[
                      "Please enter 10 digit Mobile",
                      "Please enter 10 digit Mobile",
                    ]}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      name="status"
                      required={true}
                      value={values.status}
                      onChange={handleChange}
                    >
                      {statusvalues.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextValidator
                    label="Feedback"
                    size="small"
                    color="green"
                    type="textarea"
                    name="feedback"
                    multiline
                    required={true}
                    value={values.feedback}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Divider />
              <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
                <Stack spacing={1} direction="row">
                  <Button
                    sx={{ color: "#FFFFFE" }}
                    variant="contained"
                    color="green"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{ color: "#FFFFFE" }}
                    variant="contained"
                    color="green"
                    to="/job-supp-table"
                    component={Link}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="green"
                    type="reset"
                    onClick={clearFields}
                  >
                    Clear
                  </Button>
                </Stack>
              </div>
            </ValidatorForm>
            <SnackBar open={open} setOpen={setOpen} />
          </ThemeProvider>
        </div>
      </Paper>
    </>
  ) : (
    login()
  );
};

export default JobSupportForm;
