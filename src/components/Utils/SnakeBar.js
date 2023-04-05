import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
const SnackBar = ({ open, setOpen }) => {
  const history = useNavigate();
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    history(-1);
    console.log("goback works");
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{
        transition: ".3s",
        left: "76vw",
        top: "5vw",
        zIndex: 20,
      }}
      onClose={handleClose}
    >
      <Fade right>
        <div
          style={{
            color: "white",
            backgroundColor: "#4caf50",
            width: "20vw",
            padding: "16px",
            borderRadius: "5px",
          }}
          severity="success"
        >
          Request submitted succesfully!
        </div>
      </Fade>
    </Snackbar>
  );
};

export default SnackBar;
