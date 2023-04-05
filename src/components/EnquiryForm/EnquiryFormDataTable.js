import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import UseForm from "./UseForm";
import EnqFormActions from "./EnqFormActions";
import { useValue } from "../../Context/ContextProvider";

const EnquiryFormDataTable = () => {
  const inputBox = {
    "& .MuiDataGrid-toolbarQuickFilter": {
      "& .MuiTextField-root": {
        backgroundColor: "#fffffe",
        borderRadius: "2px",
        width: "70ch",
      },
      borderRadius: "5px",
      width: "70ch",
    },
    "& .MuiPopperUnstyled-root": {
      inset: `-125px auto auto 350px`,
    },
    "& .MuiDataGrid-panel": {
      inset: `-125px auto auto 350px`,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      opacity: ".8",
      fontWeight: "700",
    },
    "& .MuiDataGrid-toolbarContainer ": {
      justifyContent: "space-between",
      backgroundColor: "rgba(145, 158, 171, 0.12)",
      borderRadius: "10px",
    },
    "& .MuiDataGrid-main ": {},
    margin: "0 auto",
    width: "100%",
    "& .MuiTextField-root": {
      m: 2,
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "40ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#d8eefe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    justifyContent: "center",
    height: "700px",
    flexGrow: 1,
    position: "relative",
    borderRadius: "12px",
    padding: "30px",
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#094067",
        },
        green: {
          main: "#094067",
        },
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
      },
    });
  const {
    state: { isLogged },
  } = useValue();
  const [editId, setEditId] = useState(null);
  const { enqrequests } = UseForm();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const enqColumns = useMemo(() => [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
      filterable: true,
      renderCell: (params) => (
        <EnqFormActions {...{ params, editId, setEditId }} />
      ),
    },
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   sortable: false,
    //   headerAlign: "center",
    //   align: "center",
    //   filterable: true,
    // },
    {
      field: "name",
      headerAlign: "center",
      editable: true,
      align: "center",
      headerName: "Name",
      width: 100,
      filterable: false,
    },
    {
      field: "followup_call_date",
      headerAlign: "center",
      align: "center",
      editable: true,
      filterable: true,
      headerName: "FollowUp Date",
      width: 120,
    },
    {
      field: "followup_status",
      headerAlign: "center",
      align: "center",
      editable: true,
      filterable: true,
      headerName: "Followup Status",
      width: 120,
      type: "singleSelect",
      valueOptions: [
        "Trainer Needed",
        "Confrimed",
        "Demo Completed",
        "Demo Scheduled",
        "Demo Yet to Schedule",
        "Not Able To Provide",
        "Need to Follow",
        "No Response",
        "Others",
      ],
    },
    {
      field: "comments",
      headerAlign: "center",
      align: "center",
      editable: true,
      filterable: true,
      headerName: "Comments",
      width: 120,
    },
    {
      field: "enquiry_by",
      headerAlign: "center",
      align: "center",
      editable: true,
      filterable: true,
      headerName: "Enquiry By",
      width: 120,
      type: "singleSelect",
      valueOptions: ["Email", "mobile", "Email&Mobile"],
    },
    {
      field: "mobile",
      headerAlign: "center",
      align: "center",
      editable: true,
      headerName: "Mobile",
      width: 100,
      filterable: true,
    },
    {
      field: "location",
      headerName: "Location",
      editable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
      sortable: true,
      filterable: true,
    },
    {
      field: "course",
      headerName: "Course",
      editable: true,
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: true,
      filterable: true,
    },
    {
      field: "fee_structure",
      headerName: "Fee Structure ",
      editable: true,
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: true,
      filterable: true,
    },
    {
      field: "experience_by",
      headerName: "Experience/Domain",
      editable: true,
      width: 100,
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["Working Professional", "Corporate", "Fresher", "Student"],
      filterable: false,
    },
    {
      field: "mode",
      headerName: "Mode",
      editable: true,
      width: 100,
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      valueOptions: ["online", "offline", "both"],
      filterable: false,
    },
  ]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ background: "#000000" }}>
        <GridToolbarQuickFilter sx={{ marginRight: "auto" }} />
        <GridToolbarFilterButton
          PopperProps={{ color: "#000000", inset: `-5px auto auto 350px` }}
          sx={{ ml: 2, bgcolor: "#FFFFFF", marginLeft: "auto" }}
        />
        <GridToolbarDensitySelector sx={{ ml: 2, bgcolor: "#FFFFFF" }} />
        <GridToolbarColumnsButton sx={{ ml: 2, bgcolor: "#FFFFFF" }} />
        <GridToolbarExport sx={{ m: 2, bgcolor: "#FFFFFF" }} />
      </GridToolbarContainer>
    );
  }
  return isLogged ? (
    <>
      <ThemeProvider theme={getMuiTheme()}>
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
                Course-Enquiry List
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
                Manage your requests detail and status
              </Typography>
            </div>
            <div>
              <Button
                to="/enquiry-form"
                component={Link}
                size="small"
                color="secondary"
                sx={{ height: "30px", width: "40px", color: "#FFFFFE" }}
                startIcon={<AddIcon />}
                onClick={window.scrollTo(0, 0)}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </div>
          <Box height={595}>
            <DataGrid
              sx={{ border: 0 }}
              columns={enqColumns}
              rows={enqrequests}
              getRowId={(row) => row.id}
              rowsPerPageOptions={[10, 20, 30]}
              components={{ Toolbar: CustomToolbar }}
              disableColumnMenu
              componentsProps={{
                toolbar: {
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 250 },
                },
                panel: {
                  sx: {
                    "& .MuiDataGrid-filterForm": {},
                    "& .MuiDataGrid-paper": {
                      boxShadow: "none !important",
                    },
                    inset: `-125px auto auto 448px !important`,
                  },
                },
              }}
              onCellEditCommit={(params) => {
                setEditId(params.id);
              }}
            />
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  ) : (
    login()
  );
};

export default EnquiryFormDataTable;
