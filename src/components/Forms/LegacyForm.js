import SimpleCard from "../Utils/SimpleCard";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
// import { PersonalInfo } from "./PersonalInfo";
import QontoConnector from "../Utils/StepperUtils";
import Sidebar from "../Sidebar/Sidebar";

export const EnqForm = (props) => {
  function getSteps() {
    return ["Personal Information", "Services", "Documents"];
  }
  const Pstyl = {
    fontFamily: "PT Sans Caption",
    fontSize: "18px",
    margin: "30px",
    fontWeight: "bold",
    position: "relative",
    color: "#000000",
  };



  //   const QontoStepIconRoot = styled('div')<{ ownerState: { active ?: boolean } }>(
  //   ({ theme, ownerState }) => ({
  //     color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  //     display: 'flex',
  //     height: 22,
  //     alignItems: 'center',
  //     ...(ownerState.active && {
  //       color: '#784af4',
  //     }),
  //     '& .QontoStepIcon-completedIcon': {
  //       color: '#784af4',
  //       zIndex: 1,
  //       fontSize: 18,
  //     },
  //     '& .QontoStepIcon-circle': {
  //       width: 8,
  //       height: 8,
  //       borderRadius: '50%',
  //       backgroundColor: 'currentColor',
  //     },
  //   })
  // );

  const user_fields = [
    "First Name",
    "Last Name",
    "Mobile",
    "Location",
    "City",
    "Email",
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
                return `Integer euismod dapibus sapien, a interdum augue blandit eget. Donec pellentesque, sapien iaculis dignissim sagittis, risus nulla auctor eros, sed suscipit eros mauris id lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer porttitor mauris egestas consequat molestie. Nam egestas iaculis malesuada. Praesent sagittis venenatis finibus. Praesent porttitor ipsum et sapien cursus, eu mattis augue ornare.`;


      case 1:
        return `Integer euismod dapibus sapien, a interdum augue blandit eget. Donec pellentesque, sapien iaculis dignissim sagittis, risus nulla auctor eros, sed suscipit eros mauris id lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer porttitor mauris egestas consequat molestie. Nam egestas iaculis malesuada. Praesent sagittis venenatis finibus. Praesent porttitor ipsum et sapien cursus, eu mattis augue ornare.`;

      case 2:
        return `In laoreet, dui vel tristique facilisis, velit dui dictum diam, nec feugiat mi mauris eu nunc. Nullam auctor eget ante ac laoreet. Aliquam et ante ligula. Nam imperdiet augue magna, ac tincidunt neque mollis nec. Sed eu nunc sit amet tellus commodo elementum non sit amet sem. Etiam ipsum nibh, rutrum vel ultrices in, vulputate ac dolor. Morbi dictum lectus id orci dapibus, et faucibus nulla viverra. Nulla consectetur ex vitae pretium vehicula. Quisque varius tempor erat et semper. Vivamus consectetur, eros sit amet ornare facilisis, nulla felis laoreet tortor, sit amet egestas risus ipsum sed eros.`;

      default:
        return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
    }
  }

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);


  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A3560",
      },
      secondary: {
        main: "#D2DFFF",
      },
    },
  });

  return (
        <FormControl>
            <ThemeProvider theme={theme}>
              <Typography style={Pstyl}>Enquiry Form </Typography>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<QontoConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box mt={4} sx={{ paddingTop: "30px" }}>
                {activeStep === steps.length ? (
                  <Box>
                    <Typography>All steps completed</Typography>

                    <Button
                      sx={{ mt: 2 }}
                      variant="contained"
                      color="secondary"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography>{getStepContent(activeStep)}</Typography>

                    <Box
                      pt={2}
                      sx={{
                        ml: 2,
                        display: "flex",
                        justifyContent: "space-evenly",
                        top: "90px",
                        position: "relative",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </ThemeProvider>
          </FormControl>
  );
};

