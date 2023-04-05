import { useValue } from "../../Context/ContextProvider";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import fillings from "../../Assets/tax.png";
import jobSupport from "../../Assets/jobsupport.png";
import courseEnq from "../../Assets/courseEnq.png";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    width: "101vw",
    height: "100vh",
    marginLeft: "-3vw",
    marginTop: "-3.5vh",
  },
  title: {
    flexGrow: 1,
  },
  hero: {
    backgroundSize: "fill",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "2vw",
  },
  heroTitle: {
    fontSize: "5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "1rem",
  },
  heroButton: {
    fontSize: "1rem",
    // fontSize: "16px",
    fontWeight: "bold",
    color: "#F6F1F1",
    backgroundColor: "#000000",
    padding: "1vw 3vw",
    borderRadius: "5px",
    marginLeft: "-1vw",
    "&:hover": {
      backgroundColor: "#002B5B",
    },
  },
  imgContainer: {
    display: "flex",
    gap: "10vw",
    marginBottom: "10vw",
    marginTop: "5vw",
  },
  img: {
    width: "10vw",
    height: "10vw",
    color: "#FFF2CC",
  },
}));

function HomePage() {
  const classes = useStyles();
  const { state, dispatch } = useValue();

  const changePath = () => {
    window.location = "https://intellecto.co.in/about-us/";
  };
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
    dispatch({ type: "HOME", payload: false });
  };

  React.useEffect(() => {
    dispatch({ type: "HOME", payload: true });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        sx={{
          backgroundColor: "#d8eefe",
          "& .MuiToolbar-gutters": {
            paddingLeft: "0px",
          },
          "& .MuiAppBar-colorPrimary": {
            backgroundColor: "#094067",
          },
        }}
        position="fixed"
        color="background"
      >
        <Toolbar>
          <Grid
            style={{
              backgroundColor: "#d8eefe",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <Grid style={{ display: "flex" }}>
              <img
                style={{
                  width: "58px",
                  height: "60px",
                  margin: "1vw",
                }}
                src="https://naukrirecruiter.naukri.com/profilePic/getpic?pid=1657171204rp4517760_medium4"
              />
              <h1
                style={{
                  color: "#094067",
                  fontSize: "1.5rem",
                  padding: "1vw 0vw",
                }}
              >
                Intellecto Global Services
              </h1>
            </Grid>
            <Grid style={{ display: "flex", marginRight: "1vw", gap: "1vw" }}>
              <Button style={{ color: "#094067" }}>Contact Us</Button>
              <Button style={{ color: "#094067" }} onClick={changePath}>
                About Us
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.hero}>
        <Grid
          variant="h3"
          className={classes.heroTitle}
          style={{ color: "#ef4565", fontSize: "3rem", padding: "1vw 5vw" }}
        >
          Enquiry-Hub
        </Grid>
        <div className={classes.imgContainer}>
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-5vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
            }}
            className={classes.img}
            alt="fillings"
            src={fillings}
          />
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-5vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
              delay: 0.5,
            }}
            className={classes.img}
            alt="jobsupport"
            src={jobSupport}
          />
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-5vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
              delay: 1,
            }}
            className={classes.img}
            alt="courseenq"
            src={courseEnq}
          />
        </div>

        <Grid style={{ marginTop: "-6vw", color: "#094067" }}>
          <h4 style={{ marginLeft: "-1.2vw" }}>Three Apps, One Tap</h4>
          <motion.Button
            onClick={login}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
            }}
            variant="contained"
            className={classes.heroButton}
          >
            Sign In
          </motion.Button>
        </Grid>
      </div>
    </div>
  );
}

export default HomePage;
