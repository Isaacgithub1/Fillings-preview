import React from "react";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Snackbar from "@material-ui/core/Snackbar";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import UseForm from "./UseForm";
import { useValue } from "../../Context/ContextProvider";
import Fade from "react-reveal/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import SnackBar from "../Utils/SnakeBar";

const EnquiryForm = () => {
  
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
    "Trainer Needed",
    "Confrimed",
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
    "Not Able To Provide",
    "Need to Follow",
    "No Response",
    "Others",
  ];

  const enquiry = ["Email", "Mobile", "Email & Mobile"];
  const domain = ["Working Professional", "Corporate", "student", "fresher"];
  const mode = ["online", "offline", "both"];

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
              Enquiry Form
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
                    label="Name"
                    size="small"
                    color="green"
                    type="text"
                    name="name"
                    required={true}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      orientation="landscape"
                      label="Follow Up Call Date"
                      openTo="day"
                      format="dd-MM-yyyy"
                      views={["day"]}
                      value={values.followup_call_date}
                      onChange={(e) => {
                        const date = new Date(e);
                        setValues({
                          ...values,
                          followup_call_date: `${date}`,
                        });
                      }}
                      renderInput={(params) => (
                        <TextValidator
                          color="green"
                          size="small"
                          {...params}
                          helperText={null}
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Follow Up Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Follow Up Status*"
                      color="green"
                      name="followup_status"
                      required={true}
                      value={values.followup_status}
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
                    label="Comments"
                    size="small"
                    multiline
                    color="green"
                    type="text"
                    name="comments"
                    required={true}
                    value={values.comments}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Enquired By
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired By*"
                      color="green"
                      name="enquiry_by"
                      required={true}
                      value={values.enquiry_by}
                      onChange={handleChange}
                    >
                      {enquiry.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  <TextValidator
                    label="Location"
                    size="small"
                    color="green"
                    type="text"
                    name="location"
                    required={true}
                    value={values.location}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Course"
                    size="small"
                    color="green"
                    type="text"
                    name="course"
                    required={true}
                    value={values.course}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Fee Structure"
                    size="small"
                    color="green"
                    type="text"
                    name="fee_structure"
                    required={true}
                    value={values.fee_structure}
                    onChange={handleChange}
                  />
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Experience/Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Experience/Domain*"
                      color="green"
                      name="experience_by"
                      required={true}
                      value={values.experience_by}
                      onChange={handleChange}
                    >
                      {domain.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <TextValidator
                    label="Info Source"
                    size="small"
                    color="green"
                    type="text"
                    name="info_source"
                    required={true}
                    value={values.info_source}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Purpose"
                    size="small"
                    color="green"
                    type="text"
                    name="purpose"
                    required={true}
                    value={values.purpose}
                    onChange={handleChange}
                  /> */}
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Mode*"
                      color="green"
                      name="mode"
                      required={true}
                      value={values.mode}
                      onChange={handleChange}
                    >
                      {mode.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </Grid>
              </Grid>
              <Divider/>
              <div style={{ width: "100%",padding:"20px 0 20px 0" }}>
              <Stack spacing={1} direction="row">
                <Button
                  sx={{color: "#FFFFFE" }}
                  variant="contained"
                  color="green"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  sx={{color: "#FFFFFE" }}
                  variant="contained"
                  color="green"
                  to="/enquiry-table"
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

export default EnquiryForm;
