import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValue } from "../../Context/ContextProvider";
import { useSignIn } from "react-auth-kit";
import { loginData } from "../../Redux/loginSlice";
import { useDispatch } from "react-redux";
import { height } from "@mui/system";
import bg from "../../Assets/patterns.png";
import logo from "../../Assets/logo.png";

const theme = createTheme({
  palette: {
    backgroundColor: "red",
  },
  root: {
    padding: 0,
    backgroundColor: "red",
  },
});

export default function SignInComponent() {
  const [error, setError] = useState();
  const dispatches = useDispatch();
  const { dispatch } = useValue();
  const signIn = useSignIn();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const post_resp = await res.json();
    setError(post_resp.errors);
    console.log("login user", post_resp);
    console.log("setError:", error);

    if (post_resp.active_flag == true) {
      signIn({
        token: post_resp.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { user: values.user_name },
        // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
        // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
      });
      //   dispatch({ type: "LOGGED_IN" });
      dispatch({ type: "LOGGED_IN", payload: true });
      dispatch({ type: "IS_ADMIN", payload: post_resp.is_admin });
      dispatch({ type: "APPS_ACCESS", payload: post_resp.apps });
      dispatch({ type: "CURRENT_USER", payload: post_resp.user_name });

      dispatches(
        loginData({
          currentUser: post_resp.user_name,
          apps: post_resp.apps,
          isLoggedIn: true,
        })
      );
      navigate("/enq-admin");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      {/* <img
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          top: 0,
          margin: 0,
          padding: 0,
          left: 0,
        }}
        src={bg}
      /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-4vw",
          zIndex: 2,
        }}
      >
        <img
          style={{
            //   position: "absolute",
            width: "15rem",
            //   height: "100vh",
            top: 0,
            margin: 0,
            padding: 0,
            left: 0,
            zIndex: 2,
          }}
          src={logo}
        />
        <Paper
          sx={{
            borderRadius: "12px",
            width: "40vw",
            margin: "auto",
            marginTop: "-5vw",
            position: "relative",
          }}
          elevation={3}
        >
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4vw",
                paddingTop: "2vw",
                borderRadius: "20px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontSize: "2.5vw",
                  marginTop: "1vw",
                }}
              >
                Sign in
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginTop: "3vw",

                    "& .MuiGrid-item": { paddingTop: "0px" },
                  }}
                >
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      variant="filled"
                      value={values.email}
                      onChange={handleChange}
                      sx={{
                        border: "2px solid ",
                        borderBottom: 0,
                        borderColor: error ? "red" : "#d8eefe",
                        "& .MuiOutlinedInput-root.Mui-focused:before": {
                          borderBottom: "2px solid blue", // Change the border-bottom property as per your preference
                        },
                        "&:active": {
                          backgroundColor: '"#00000000"!important',
                          "&:before": {
                            borderBottom: "0px",
                            backgroundColor: '"#00000000"!important',
                          },
                        },
                        "&:hover": {
                          border: "2px solid ",
                          borderBottom: 0,
                          borderColor: error ? "red" : "#d8eefe",
                          backgroundColor: '"#00000000"!important',
                          "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                            {
                              "&:before": {
                                borderBottom: "0px",
                              },
                            },
                        },
                        "&:hover:before": { borderBottom: "0px" },

                        borderRadius: "10px 10px 0px 0px",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          borderRadius: "10px 10px 0px 0px",

                          "before:& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                            {
                              borderBottom: "none",
                            },
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      label="Password"
                      type="password"
                      name="password"
                      variant="filled"
                      sx={{
                        border: "2px solid ",
                        borderColor: error ? "red" : "#d8eefe",
                        "&:active": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                        "&:hover": {
                          border: "2px solid ",
                          borderColor: error ? "red" : "#d8eefe",
                          "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                            {
                              "&:before": {
                                borderBottom: "0px",
                              },
                            },
                        },
                        "&:hover:before": { borderBottom: "0px" },
                        borderRadius: "0px 0px 10px 10px",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          borderRadius: "0px 0px 10px 10px",
                          "before:& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                            {
                              borderBottom: "none",
                            },
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: ".5rem" }}>
                    <span
                      style={{
                        color: "red",
                        fontSize: "1rem",
                        position: "relative",
                        textDecoration: "none",
                      }}
                    >
                      {error}
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      style={{
                        color: "blue",
                        fontSize: "1rem",
                        position: "absolute",
                        textDecoration: "none",
                        marginTop: "1.5rem",
                      }}
                      to="#"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 10,
                      mb: 2,
                      border: "1px",
                      borderRadius: "2vw",
                      width: "10vw",
                      height: "3vw",
                      fontSize: "6rm",
                      backgroundColor: "#3da9fc",
                    }}
                  >
                    Sign in
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
