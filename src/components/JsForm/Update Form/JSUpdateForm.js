import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Stack } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import green from "@material-ui/core/colors/green";
import UpdateLogics from "./JSUpdateLogics";

const JSUpdateForm = ({ open, setOpen, params, page }) => {
  const { values, payment, handlePaymentChange, handleChange, handleSubmit } =
    UpdateLogics({ page, params });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#094067",
      },
      success: {
        main: green[600],
      },
      secondary: {
        main: "#094067",
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
  const paymentValues = ["Task", "Weekly", "BiWeekly", "Monthly"];
  const paymentStatus = ["Not Paid", "Paid", "Pending"];
  return (
    <>
      <Dialog scroll={"body"} fullWidth maxWidth={"sm"} open={open}>
        <DialogTitle
          sx={{
            fontFamily: "PT Sans Caption",
            fontSize: "18px",
            // margin: "30px",
            fontWeight: "500",
            position: "relative",
            color: "#ef4565",
            top: "1rem",
          }}
        >
          Update Form
        </DialogTitle>
        <DialogContent
          // sx={{
          //   height: values.status === "Confrimed" ? "450px" : "300px",
          // }}
        >
          <DialogContentText></DialogContentText>
          <Box mt={2}>
            <ThemeProvider theme={theme}>
              <ValidatorForm onSubmit={""}>
                <Grid
                  style={{
                    "& .MuiTypographyH6": {
                      fontSize: "12px",
                      lineHeight: "35px",
                      fontWeight: "600",
                    },
                    flexDirection: "column",
                    position: "relative",
                    marginTop: "1rem",
                  }}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  // mt="3"
                >
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      key={1}
                      label="Candidate name"
                      size="small"
                      type="text"
                      name="candidate_name"
                      required={true}
                      value={values.candidate_name}
                      onChange={handleChange}
                    />
                    <TextValidator
                      label="Technology"
                      size="small"
                      type="text"
                      name="technology"
                      required={true}
                      value={values.technology}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      key={1}
                      label="Mobile"
                      size="small"
                      type="number"
                      name="mobile"
                      required={true}
                      value={values.mobile}
                      onChange={handleChange}
                    />
                    <TextValidator
                      label="Resource"
                      size="small"
                      type="text"
                      name="resource"
                      required={true}
                      value={values.resource}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      label="FeedBack"
                      size="small"
                      type="text"
                      name="feedback"
                      required={true}
                      value={values.feedback}
                      onChange={handleChange}
                    />
                    <FormControl sx={{ minWidth: "25ch" }} size="small">
                      <InputLabel color="green" id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-label"
                        label="Status*"
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
                  </Grid>
                  {values.status === "Confrimed" ? (
                    <Grid
                      style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                    >
                      <FormControl sx={{ minWidth: "25ch" }} size="small">
                        <InputLabel color="green" id="demo-simple-select-label">
                          Payment Peroid
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-label"
                          label="Payment_Period*"
                          color="green"
                          required={true}
                          name="payment_period"
                          value={values.payment_period}
                          onChange={handleChange}
                        >
                          {paymentValues.map((val, index) => (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextValidator
                        label="Payable Amount"
                        size="small"
                        type="text"
                        name="payment_amount"
                        required={true}
                        value={payment.payment_amount}
                        onChange={handlePaymentChange}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {values.status === "Confrimed" ? (
                    <Grid
                      style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                    >
                      <FormControl sx={{ minWidth: "25ch" }} size="small">
                        <InputLabel color="green" id="demo-simple-select-label">
                          Payment Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-label"
                          label="Payment_Status*"
                          color="green"
                          required={true}
                          name="payment_status"
                          value={payment.payment_status}
                          onChange={handlePaymentChange}
                        >
                          {paymentStatus.map((val, index) => (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Stack spacing={40} direction="row" mt="1rem">
                  <Button
                    variant="contained"
                    color="secondary"
                    // disabled={activeStep === 0}
                    onClick={() => {
                      if (window.confirm("Do You Want Discard Changes")) {
                        setOpen(false);
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ left: "4rem" }}
                    onClick={() => {
                      if (window.confirm("Are you sure, You want to Save")) {
                        handleSubmit();
                        setOpen(false);
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </ValidatorForm>
            </ThemeProvider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JSUpdateForm;
