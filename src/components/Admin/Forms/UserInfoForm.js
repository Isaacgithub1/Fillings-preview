import { Grid } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from "react";

const UserInfoForm = ({ params, setInfo, userinfo }) => {
    console.log("user data",userinfo)
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <ValidatorForm onSubmit={""}>
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
        <Grid style={{ display: "flex" }}>
          <TextValidator
            key={1}
            label="First name"
            size="small"
            type="text"
            name="first_name"
            required={true}
            value={userinfo.first_name}
            onChange={handleChangeInfo}
          />
          <TextValidator
            label="Last name"
            size="small"
            type="text"
            name="last_name"
            required={true}
            value={userinfo.last_name}
            onChange={handleChangeInfo}
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
            onChange={handleChangeInfo}
            size="small"
            type="text"
          />
          <TextValidator
            label="Email"
            onChange={(e) => setInfo({ ...userinfo, email: e.target.value })}
            name="email"
            size="small"
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
            onChange={handleChangeInfo}
            size="small"
            required={true}
            type="text"
          />
          <TextValidator
            label="City"
            size="small"
            name="city"
            value={userinfo.city}
            onChange={handleChangeInfo}
            required={true}
            type="text"
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextValidator
            label="Pincode"
            size="small"
            name="pincode"
            value={userinfo.pincode}
            onChange={handleChangeInfo}
            validators={["isNumber", "matchRegexp:^[1-9][0-9]{5}$"]}
            errorMessages={[
              "Please enter 6 digit Pincode",
              "Please enter 6 digit Pincode",
            ]}
            type="text"
            required={true}
          />
          <TextValidator
            size="small"
            id="demo-simple-label"
            label="Enquired for"
            value={userinfo.enquired_for}
            name="enquired_for"
            required={true}
          />
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default UserInfoForm;
