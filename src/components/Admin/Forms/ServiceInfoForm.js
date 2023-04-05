import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const ServiceInfoForm = ({ userinfo, output, setOutput }) => {
  console.log("Output  1", output);
  console.log("services", userinfo);
  const handleBack = () => {
    return;
  };
  return (
    <ValidatorForm onSubmit={handleBack}>
      <Grid
        style={{
          left: "20px",
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
        alignItems="center"
      >
        {userinfo.enquired_for === "GST" && (
          <Grid>
            <RadioGroup
              row
              name="gst_time"
              required={true}
              sx={{ mb: 2, p: 0, position: "relative" }}
              value={output.gst_time || ""}
              onChange={(e) =>
                setOutput({
                  ...output,
                  [e.target.name]: e.target.value,
                })
              }
            >
              {["Monthly", "Quaterly", "Yearly"].map((period) => (
                <FormControlLabel
                  key={period}
                  value={period}
                  label={period}
                  labelPlacement="end"
                  control={<Radio required={true} />}
                />
              ))}
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {output.gst_time === "Yearly" ? (
                <DatePicker
                  orientation="landscape"
                  openTo="year"
                  views={["year"]}
                  value={output.period || Date()}
                  label="Period"
                  onChange={(e) => {
                    const date = new Date(e);
                    const year = date.getFullYear();
                    setOutput({
                      ...output,
                      period: `${year}`,
                    });
                  }}
                  renderInput={(params) => (
                    <TextValidator
                      size="small"
                      {...params}
                      helperText={null}
                      fullWidth
                    />
                  )}
                />
              ) : output.gst_time === "Monthly" ? (
                <DatePicker
                  orientation="landscape"
                  openTo="month"
                  label="Period"
                  views={["year", "month"]}
                  value={output.period.month}
                  onChange={(e) => {
                    const date = new Date(e);
                    const month = date.toLocaleString("default", {
                      month: "short",
                    });
                    const year = date.getFullYear();
                    setOutput({
                      ...output,
                      period: `${year}-${month}`,
                    });
                  }}
                  renderInput={(params) => (
                    <TextValidator
                      size="small"
                      {...params}
                      helperText={null}
                      fullWidth
                    />
                  )}
                />
              ) : output.gst_time === "Quaterly" ? (
                <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                  <InputLabel id="demo-simple-select-label">Period</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={output.period || "Q1"}
                    label="Period"
                    name="period"
                    onChange={(e) => {
                      setOutput({
                        ...output,
                        period: e.target.value,
                      });
                    }}
                  >
                    {["Q1", "Q2", "Q3", "Q4"].map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </LocalizationProvider>
          </Grid>
        )}
        {userinfo.enquired_for === "GST Registration" && (
          <>
            <Grid sx={{ display: "flex" }}>
              {console.log("output", output)}
              <TextValidator
                label="Company name"
                size="small"
                name="company_name"
                required={true}
                value={output.company_name}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                fullWidth
              />
              <TextValidator
                label="Company address"
                multiline
                size="small"
                name="company_address"
                value={output.company_address}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                fullWidth
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextValidator
                label="City"
                name="company_city"
                value={output.company_city}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                size="small"
                type="text"
                fullWidth
              />
              <TextValidator
                label="Pincode"
                name="company_pincode"
                value={output.company_pincode}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                size="small"
                type="tel"
                fullWidth
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextValidator
                label="Email"
                name="company_email"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                value={output.company_email}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                size="small"
                type="email"
                fullWidth
              />
              <TextValidator
                label="Employer Pan"
                name="employer_pan"
                value={output.employer_pan || ""}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                size="small"
                required={true}
                type="tel"
                fullWidth
              />
            </Grid>
          </>
        )}
        {userinfo.enquired_for === "PAN Registration" && (
          <>
            <Grid style={{ display: "flex" }}>
              <TextValidator
                label="Aadhar Number"
                size="small"
                validators={[
                  "matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
                ]}
                errorMessages={["Please enter 12 digit number "]}
                name="aadhar"
                required={true}
                value={output.aadhar || ""}
                mask={[
                  /[A-Za-z]/,
                  /[A-Za-z]/,
                  /[A-Za-z]/,
                  /[A-Za-z]/,
                  /[A-Za-z]/,
                  /[0-9]/,
                  /[0-9]/,
                  /[0-9]/,
                  /[0-9]/,
                  /[A-Za-z]/,
                ]}
                onChange={(e) =>
                  setOutput({
                    ...output,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
              />
            </Grid>
          </>
        )}
        {userinfo.enquired_for === "TAX Registration" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
              <Grid sx={{ display: "flex" }}>
                <DatePicker
                  orientation="landscape"
                  width="inherit"
                  openTo="year"
                  label="Assessment year"
                  views={["year"]}
                  name="assessment_year"
                  value={output.assessment_year || Date()}
                  onChange={(e) => {
                    const date = new Date(e);
                    const year = date.getFullYear();
                    setOutput({
                      ...output,
                      assessment_year: `${year}`,
                    });
                  }}
                  renderInput={(params) => (
                    <TextValidator
                      required={true}
                      size="small"
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
                  name="pan"
                  validators={["matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$"]}
                  errorMessages={["Please enter valid PAN number"]}
                  value={output.pan || ""}
                  onChange={(e) =>
                    setOutput({
                      ...output,
                      [e.target.name]: e.target.value.toUpperCase(),
                    })
                  }
                  type="text"
                  id="outlined-textarea"
                />
              </Grid>
            </>
          </LocalizationProvider>
        )}
      </Grid>
    </ValidatorForm>
  );
};
export default ServiceInfoForm;
