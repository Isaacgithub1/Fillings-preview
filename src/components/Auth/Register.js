import React from "react";
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
import { useSignIn } from "react-auth-kit";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SignUpComponent() {
    const signIn = useSignIn();
    const [values, setValues] = React.useState({
      email: "",
      user_name: "",
      password: "",
      is_admin: 1,
      apps : ["Filings", "Admin", "Job-Support", "Course-Enquiry"]
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(values)

      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const post_resp = await res.json();
      if (post_resp) {
        navigate(-1);
      }
    };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          borderRadius: "12px",
          width: "40vw",
          margin: "auto",
          marginTop: "5vw",
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
              }}
            >
              Sign Up
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "4vw",
                  "& .MuiGrid-item": { paddingTop: "0px" },
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    name="user_name"
                    type="text"
                    variant="filled"
                    value={values.user_name}
                    onChange={handleChange}
                    sx={{
                      border: "2px solid #d8eefe",
                      "&:hover": {
                        border: "2px solid #3da9fc",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },
                      borderRadius: "10px 10px 0px 0px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",
                        "&:hover": {
                          backgroundColor: "#00000000",
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
                    label="Email"
                    name="email"
                    type="text"
                    variant="filled"
                    value={values.email}
                    onChange={handleChange}
                    sx={{
                      border: "2px solid #d8eefe",
                      "&:hover": {
                        border: "2px solid #3da9fc",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },

                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",

                        "&:hover": {
                          backgroundColor: "#00000000",
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
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    type="pas
                    sword"
                    variant="filled"
                    security="*"
                    sx={{
                      border: "2px solid #d8eefe",
                      "&:hover::active": {
                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                      "&:hover": {
                        border: "2px solid #3da9fc",

                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },
                      "&:hover:before": { borderBottom: "0px" },
                      borderRadius: "0px 0px 10px 10px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",

                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                      "& .Mui-focused": {
                        borderBottom: "0px",
                      },
                    }}
                  />
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
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 2,
                    border: "1px",
                    borderRadius: "2vw",
                    width: "10vw",
                    height: "3vw",
                    fontSize: "6rm",
                    backgroundColor: "#3da9fc",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
