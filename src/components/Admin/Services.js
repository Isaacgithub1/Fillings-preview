import { Grid } from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF"];
function getSteps() {
  return ["Personal Information", "Services", "Documents"];
}
function ServiceFileForm(params) {
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };
  return (
    <>
      <Grid
        style={{
          left: "20px",
          "& .MuiTypographyH6": {
            fontSize: "12px",
            lineHeight: "35px",
            fontWeight: "600",
          },
          flexDirection: "column",
          margin: "20px",
          position: "relative",
        }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <FileUploader
          multiple={true}
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
        />
        <p style={{ padding: "20px" }}>
          {file ? `File name: ${file[0].name}` : "No files uploaded yet"}
        </p>
      </Grid>
    </>
  );
}

export { ServiceFileForm, getSteps };
