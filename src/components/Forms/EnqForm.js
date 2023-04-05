import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
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
import { Alert } from "@material-ui/lab";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { v4 as uuid } from "uuid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { getRequests } from "../../Context/actions";
import { useValue } from "../../Context/ContextProvider";

import { Link, useNavigate } from "react-router-dom";
import SnackBar from "../Utils/SnakeBar";
export const EnqForm = (props) => {
  const { dispatch } = useValue();
  const [uid, setUid] = React.useState(uuid().slice(0, 7));
  const [open, setOpen] = React.useState(false);
  const [userinfo, setInfo] = React.useState({
    req_id: uid,
    first_name: "vignesh",
    last_name: "siva",
    mobile: "7639290579",
    email: "vignxs@gmail.com",
    address: "15/10 , mela thoopu street",
    city: "PYR",
    pincode: "609307",
  });
  const [newGstinfo, setnewGstInfo] = React.useState({
    req_id: uid,
    company_name: "IGS",
    company_address: "medavakkam koot road",
    company_city: "chennai",
    company_pincode: "600021",
    company_email: "igs@gamil.com",
    created_by: "vignxs",
    updated_by: "vignxs",
  });
  const [Gstinfo, setGstInfo] = React.useState({
    req_id: uid,
    gst_time: "",
    period: "",
    created_by: "vignxs",
    updated_by: "vignxs",
  });
  const [Paninfo, setPanInfo] = React.useState({
    req_id: uid,
    created_by: "vignxs",
    updated_by: "vignxs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [Taxinfo, setTaxInfo] = React.useState({
    req_id: uid,
    pan: "",
    created_by: "vignxs",
    updated_by: "vignxs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const quaters = ["Q1", "Q2", "Q3", "Q4"];

  const handleChangeInfo = (e, service) => {
    const { name, value } = e.target;

    switch (service) {
      case "user":
        setInfo((prev) => ({ ...prev, [name]: value }));
        break;
      case "gst":
        setGstInfo((prev) => ({ ...prev, [name]: value }));
        break;
      case "newgst":
        setnewGstInfo((prev) => ({ ...prev, [name]: value }));
        break;
      case "pan":
        setPanInfo((prev) => ({ ...prev, [name]: value }));
        break;
      case "tax":
        setTaxInfo((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };
  const handleClear=()=>{
    setInfo({
      req_id: "",
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
    });
  }
  const API_ENDPOINT = "http://localhost:8000/api/v1";

  async function userInfoPost(e) {
    e.preventDefault();

    try {
      // Send POST request to save user info
      const response = await fetch(`${API_ENDPOINT}/req-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userinfo),
      });
      const newUid = uuid().slice(0, 7);
      setUid(newUid);

      // Check response status and proceed accordingly
      if (response.status === 200) {
        if (userinfo.enquired_for === "GST") {
          // Send POST request for GST info
          await fetch(`${API_ENDPOINT}/req-gst`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Gstinfo),
          });
          setGstInfo({ req_id: newUid });
        } else if (userinfo.enquired_for === "GST Registration") {
          // Send POST request for GST registration info
          await fetch(`${API_ENDPOINT}/req-gst-rgst`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGstinfo),
          });
          // Generating new req_id after submission
          setnewGstInfo({ req_id: newUid });
        } else if (userinfo.enquired_for === "PAN Registration") {
          // Send POST request for PAN registration info
          await fetch(`${API_ENDPOINT}/req-pan-rgst`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Paninfo),
          });

          // Generating new req_id after submission
          setPanInfo({ req_id: newUid });
        } else if (userinfo.enquired_for === "TAX Registration") {
          // Send POST request for TAX registration info
          await fetch(`${API_ENDPOINT}/req-tax-rgst`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Taxinfo),
          });
          // Generating new req_id after submission
          setTaxInfo({ req_id: newUid });
        }
        setOpen(true);
      } else {
        // Handle non-200 response status
        throw new Error(`Failed to save user info: ${response.status}`);
      }

      // Set submitted flag and new info object
      setInfo({
        req_id: newUid,
        first_name: "vignesh",
        last_name: "siva",
        mobile: "7639290579",
        email: "vignxs@gmail.com",
        address: "15/10, mela thoopu street",
        city: "PYR",
        pincode: "609307",
      });
      setOpen(true);
      getRequests(dispatch);
    } catch (error) {
      console.error(`Error while saving user info: ${error}`);
    }
  }

  const services = [
    "GST",
    "GST Registration",
    "PAN Registration",
    "TAX Registration",
  ];

  const inputBox = {
    margin: "0 auto",
    width: "100%",
    "& .MuiAlert-icon": {
      color: "white !important", // replace with your desired color
    },
    "& .MuiTextField-root": {
      m: 1.5,
      // borderRadius:'15px',
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

  return isLogged ? (
    <>
      <Paper elevation={3} sx={inputBox}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            position: "relative",
            right: "3px",
            width: "100%",
            paddingBottom: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
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
              Request Form
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

          <div>
            {/* <Button
                to="/enq-form"
                // component={Link}
                size="small"
                color="primary"
                sx={{ height: "30px", width: "40px" }}
                startIcon={<AddIcon />}
                onClick={{
                  componentDidUpdate() {
                    window.scrollTo(0, 0);
                  },
                }}
                variant="contained"
              >
                Add
              </Button> */}
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <ValidatorForm
            // instantValidate
            onSubmit={userInfoPost}
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
                  label="First name"
                  size="small"
                  color="green"
                  type="text"
                  name="first_name"
                  required={true}
                  value={userinfo.first_name}
                  onChange={(e) => handleChangeInfo(e, "user")}
                />
                <TextValidator
                  label="Last name"
                  size="small"
                  color="green"
                  type="text"
                  name="last_name"
                  required={true}
                  value={userinfo.last_name}
                  onChange={(e) => handleChangeInfo(e, "user")}
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <TextValidator
                  label="Mobile"
                  name="mobile"
                  validators={["isNumber"]}
                  errorMessages={["Please enter 10 digit Mobile number"]}
                  value={userinfo.mobile}
                  required={true}
                  onChange={(e) => handleChangeInfo(e, "user")}
                  size="small"
                  color="green"
                  type="text"
                />
                <TextValidator
                  label="Email"
                  onChange={(e) => handleChangeInfo(e, "user")}
                  name="email"
                  size="small"
                  color="green"
                  // required={true}
                  value={userinfo.email}
                  validators={["isEmail"]}
                  errorMessages={["email is not valid"]}
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <TextValidator
                  label="Address"
                  multiline
                  name="address"
                  value={userinfo.address}
                  onChange={(e) => handleChangeInfo(e, "user")}
                  size="small"
                  required={true}
                  color="green"
                  type="text"
                />
                <TextValidator
                  label="City"
                  size="small"
                  name="city"
                  value={userinfo.city}
                  onChange={(e) => handleChangeInfo(e, "user")}
                  color="green"
                  // required={true}
                  type="text"
                />
                <TextValidator
                  label="Pincode"
                  size="small"
                  name="pincode"
                  value={userinfo.pincode}
                  onChange={(e) => handleChangeInfo(e, "user")}
                  color="green"
                  validators={["isNumber", "matchRegexp:^[1-9][0-9]{5}$"]}
                  errorMessages={[
                    "Please enter 6 digit Pincode",
                    "Please enter 6 digit Pincode",
                  ]}
                  type="text"
                  // required={true}
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                  <InputLabel color="green" id="demo-simple-select-label">
                    Enquired for*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-label"
                    label="Enquired for*"
                    color="green"
                    value={userinfo.enquired_for || ""}
                    name="enquired_for"
                    required={true}
                    onChange={(e) => handleChangeInfo(e, "user")}
                  >
                    {services.map((val) => (
                      <MenuItem key={uuid()} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {userinfo.enquired_for === "GST" ? (
                <Grid>
                  <RadioGroup
                    row
                    name="gst_time"
                    required={true}
                    sx={{ mb: 2, p: 0, left: "20px", position: "relative" }}
                    value={Gstinfo.gst_time || ""}
                    onChange={(e) => handleChangeInfo(e, "gst")}
                  >
                    <FormControlLabel
                      value="Monthly"
                      label="Monthly"
                      labelPlacement="end"
                      control={<Radio required={true} color="green" />}
                    />

                    <FormControlLabel
                      value="Quaterly"
                      label="Quaterly"
                      labelPlacement="end"
                      control={<Radio required={true} color="green" />}
                    />

                    <FormControlLabel
                      value="Yearly"
                      label="Yearly"
                      labelPlacement="end"
                      control={<Radio required={true} color="green" />}
                    />
                  </RadioGroup>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {Gstinfo.gst_time === "Yearly" ? (
                      <DatePicker
                        orientation="landscape"
                        openTo="year"
                        views={["year"]}
                        value={Gstinfo.period || Date()}
                        label="Period"
                        onChange={(e) => {
                          const date = new Date(e);
                          // Extract the year from the date
                          const year = date.getFullYear();

                          setGstInfo({
                            ...Gstinfo,
                            period: `${year}`,
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
                    ) : Gstinfo.gst_time === "Monthly" ? (
                      <DatePicker
                        orientation="landscape"
                        openTo="month"
                        label="Period"
                        views={["year", "month"]}
                        value={Gstinfo.period || Date()}
                        onChange={(e) => {
                          const date = new Date(e);
                          // Extract the month and year from the date
                          const month = date.toLocaleString("default", {
                            month: "short",
                          });
                          const year = date.getFullYear();
                          setGstInfo({
                            ...Gstinfo,
                            period: `${year}-${month}`,
                          });
                        }}
                        renderInput={(params) => (
                          <TextValidator
                            size="small"
                            {...params}
                            color="green"
                            helperText={null}
                            fullWidth
                          />
                        )}
                      />
                    ) : Gstinfo.gst_time === "Quaterly" ? (
                      <FormControl
                        sx={{ m: 1.5, minWidth: "23ch" }}
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          Period
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color="green"
                          value={Gstinfo.period || "Q1"}
                          label="Period"
                          name="period"
                          onChange={(e) => {
                            setGstInfo({
                              ...Gstinfo,
                              period: e.target.value,
                            });
                          }}
                        >
                          {quaters.map((val) => (
                            <MenuItem key={uuid()} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      false
                    )}
                  </LocalizationProvider>
                </Grid>
              ) : userinfo.enquired_for === "GST Registration" ? (
                <>
                  <Grid style={{ display: "flex" }}>
                    <TextValidator
                      label="Company name"
                      size="small"
                      color="green"
                      name="company_name"
                      required={true}
                      value={newGstinfo.company_name}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      type="text"
                    />
                  </Grid>
                  <Grid style={{ display: "flex" }}>
                    <TextValidator
                      label="Company address"
                      multiline
                      size="small"
                      name="company_address"
                      value={newGstinfo.company_address}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      color="green"
                      type="text"
                    />
                    <TextValidator
                      label="City"
                      name="company_city"
                      value={"" || newGstinfo.company_city}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      size="small"
                      color="green"
                      type="text"
                    />
                    <TextValidator
                      label="Pincode"
                      name="company_pincode"
                      value={newGstinfo.company_pincode}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      size="small"
                      color="green"
                      type="tel"
                    />
                  </Grid>
                  <Grid style={{ display: "flex" }}>
                    <TextValidator
                      label="Email"
                      name="company_email"
                      value={newGstinfo.company_email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      size="small"
                      color="green"
                      type="email"
                    />
                    <TextValidator
                      label="Employer Pan"
                      name="employer_pan"
                      value={newGstinfo.employer_pan}
                      onChange={(e) => handleChangeInfo(e, "newgst")}
                      size="small"
                      required={true}
                      color="green"
                      type="tel"
                    />
                  </Grid>
                </>
              ) : userinfo.enquired_for === "PAN Registration" ? (
                <Grid
                  style={{
                    display: "flex",
                  }}
                >
                  <TextValidator
                    label="Aadhar Number"
                    size="small"
                    color="green"
                    validators={[
                      "matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
                    ]}
                    errorMessages={["Please enter 12 digit number "]}
                    name="aadhar"
                    required={true}
                    value={Paninfo.aadhar || ""}
                    onChange={(e) => handleChangeInfo(e, "pan")}
                    type="text"
                  />
                </Grid>
              ) : userinfo.enquired_for === "TAX Registration" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid style={{ display: "flex" }}>
                    <DatePicker
                      orientation="landscape"
                      width="inherit"
                      openTo="year"
                      label="Assessment year"
                      views={["year"]}
                      defaultValue={Date()}
                      value={Taxinfo.assessment_year}
                      onChange={(e) => {
                        const date = new Date(e);
                        // Extract the month and year from the date
                        const year = date.getFullYear();
                        setTaxInfo({
                          ...Taxinfo,
                          assessment_year: `${year}`,
                        });
                      }}
                      renderInput={(params) => (
                        <TextValidator
                          required={true}
                          size="small"
                          color="green"
                          {...params}
                          helperText={null}
                          fullWidth
                        />
                      )}
                    />
                    <TextValidator
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      size="small"
                      label="Pan"
                      required={true}
                      color="green"
                      name="pan"
                      validators={[
                        "matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
                      ]}
                      errorMessages={["Please valid Pan number "]}
                      value={Taxinfo.pan}
                      onChange={(e) => handleChangeInfo(e, "tax")}
                      type="text"
                      id="outlined-textarea"
                    />
                  </Grid>
                </LocalizationProvider>
              ) : (
                false
              )}
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
                  sx={{ color: "#FFFFFE", backgroundColor: "#90b4ce" }}
                  variant="contained"
                  component={Link}
                  to="/enq-admin"
                >
                  Cancel
                </Button>


                <Button variant="outlined" color="green" type="reset" onClick={handleClear}>

                  Clear
                </Button>
              </Stack>
            </div>
            <SnackBar open={open} setOpen={setOpen} />
          </ValidatorForm>
        </ThemeProvider>
      </Paper>
    </>
  ) : (
    login()
  );
};
