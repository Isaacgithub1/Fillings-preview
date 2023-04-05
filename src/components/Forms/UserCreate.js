import {
  Box,
  Checkbox,
  Chip,
  FormGroup,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import green from "@material-ui/core/colors/green";
import Button from "@mui/material/Button";
import { Alert } from "@material-ui/lab";
import { FormControlLabel } from "@mui/material";
import { useValue } from "../../Context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../Context/actions";
import axios from "axios";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const UserCreateForm = (props) => {
  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const names = ["Filings", "Job-Support", "Course-Enquiry"];
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);
  const [userinfo, setInfo] = React.useState({
    user_name: "vignesh",
    email: "vignxs@gmail.com",
    is_admin: false,
    apps: [],
  });
  const clearFields = () => {
    setInfo({
      user_name: "",
      email: "",
      is_admin: false,
      apps: [],
    });
  };
  const handleChangeInfo = (e, service) => {
    const { name, value } = e.target;

    switch (service) {
      case "user":
        setInfo((prev) => ({ ...prev, [name]: value }));
        break;
      case "chip":
        setInfo((prev) => ({
          ...prev,
          apps: typeof value === "string" ? value.split(",") : value,
        }));
        break;
      case "check":
        setInfo((prev) => ({
          ...prev,
          is_admin: e.target.checked,
        }));
        break;
      default:
        break;
    }
  };
  const { dispatch } = useValue();

  async function userInfoPost(e) {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/api/admin-register", userinfo)
      .then((e) => {
        console.log(e);
        // getUsers(dispatch);
        // navigate("/admin");
      })
      .catch((err) => {
        setError(err.response.data.errors[0]);
      });
    // const post_resp = await res.json();
    // setError(post_resp.errors);
    console.log(error);
  }
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
    // marginLeft: "70px",
    justifyContent: "center",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    // height: {heightBox},
    flexGrow: 1,
    position: "relative",
    borderRadius: "10px",
    padding: "30px 20px 0 30px",
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
              User Form
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
                  label="User name"
                  size="small"
                  color="green"
                  type="text"
                  name="user_name"
                  required={true}
                  value={userinfo.user_name}
                  sx={{
                    "& .css-1gkbifg-MuiFormLabel-root-MuiInputLabel-root": {
                      borderColor: error ? "red" : "",
                    },
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderColor: error ? "red" : "",
                    },
                  }}
                  onChange={(e) => handleChangeInfo(e, "user")}
                />
                <TextValidator
                  label="Email"
                  onChange={(e) => handleChangeInfo(e, "user")}
                  name="email"
                  size="small"
                  color="green"
                  sx={{
                    "& .css-1gkbifg-MuiFormLabel-root-MuiInputLabel-root": {
                      borderColor: error ? "red !important" : "",
                    },
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderColor: error ? "red" : "",
                    },
                  }}
                  // required={true}
                  value={userinfo.email}
                  validators={["isEmail"]}
                  errorMessages={["email is not valid"]}
                />
              </Grid>
              <div style={{ color: "red", marginLeft: ".8rem" }}>{error}</div>
              <Grid style={{ display: "flex" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ m: 2 }}
                        checked={userinfo.is_admin}
                        onChange={(e) => handleChangeInfo(e, "check")}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="is Admin"
                  />
                </FormGroup>

                <FormControl sx={{ m: 2, minWidth: "33ch" }} size="small">
                  <InputLabel id="demo-multiple-chip-label">Apps</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={userinfo.apps}
                    onChange={(e) => handleChangeInfo(e, "chip")}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    // MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, userinfo.apps, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                </Button>{" "}
                <Button
                  sx={{ color: "#FFFFFE" }}
                  variant="contained"
                  color="green"
                  to="/admin"
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
          <Snackbar
            open={open}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            onClose={handleClose}
          >
            <Alert
              style={{
                color: "white",
                backgroundColor: "#4caf50",
              }}
              onClose={handleClose}
              severity="success"
            >
              Request submitted succesfully!
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Paper>
    </>
  ) : (
    login()
  );
};
