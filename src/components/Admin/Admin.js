import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarExportContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { UsersActions } from "./AdminActions";
import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useValue } from "../../Context/ContextProvider";
import { getRequests } from "../../Context/actions";
import { inputBox } from "../Utils/MuiStyles";
// inspiration
// https://www.figcomponents.com?id=62cf946b12847cc9ecafe6b2

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export const EnqAdmin = (props) => {
  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const date = new Date();
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
    state: { requests },
    dispatch,
  } = useValue();

  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toLocaleString();
  //   };
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const enqColumns = useMemo(
    () => [
      {
        field: "actions",
        headerName: "",
        type: "actions",
        width: 130,
        filterable: true,
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "req_id",
        headerName: "ReqId",
        width: 100,
        sortable: false,
        headerAlign: "center",
        align: "center",
        filterable: true,
      },
      {
        field: "first_name",
        headerAlign: "center",
        align: "center",
        filterable: true,
        headerName: "Name",
        width: 120,
      },

      {
        field: "mobile",
        headerAlign: "center",
        align: "center",
        headerName: "Mobile",
        width: 100,
        filterable: false,
      },
      {
        field: "email",
        headerAlign: "center",
        align: "center",
        headerName: "Email",
        width: 160,
        filterable: true,
      },

      {
        field: "enquired_for",
        headerName: "Enquired For",
        headerAlign: "center",
        align: "center",
        width: 160,
        sortable: true,
        filterable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        headerAlign: "center",
        align: "center",
        valueOptions: ["In-Progress", "Created", "Closed"],
        editable: true,
        filterable: false,
        renderCell: (params) => {
          const status = params.value;
          const color =
            status === "Closed"
              ? "#ff000036"
              : status == "In-Progress"
              ? "#fff1d6"
              : status == "Created" || status == "created"
              ? "#00800036"
              : "";
          const textColor =
            status === "Closed"
              ? "red"
              : status == "In-Progress"
              ? "#be7a14"
              : status == "Created" || status == "created"
              ? "green"
              : "";
          return (
            <div
              style={{
                color: textColor,
                backgroundColor: color,
                border: "1px",
                padding: "5px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {status}
            </div>
          );
        },
        // currentUser?.role === "admin",
      },
      {
        field: "created_at",
        headerName: "CreatedAt",
        width: 180,
        headerAlign: "center",
        filterable: false,
        align: "center",
        // valueFormatter: (params) => formatDate(params.value),
        // renderCell: (params) =>
        //   moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        // currentUser?.role === "admin",
      },
      {
        field: "updated_at",
        headerName: "UpdatedAt",
        width: 180,
        headerAlign: "center",
        align: "center",
        filterable: false,
        // valueFormatter: (params) => formatDate(params.value),
        // renderCell: (params) =>
        //   moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        // currentUser?.role === "admin",
      },
    ],
    [rowId]
  );

  useEffect(() => {
    if (requests.length === 0) getRequests(dispatch);
  }, []);

  // .MuiDataGrid-cell:focus {
  //     outline: solid #094067 1px;
  //     border-radius: 12px;
  // }
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
              Request List
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
              to="/enq-form"
              component={Link}
              size="small"
              color="secondary"
              sx={{ height: "30px", width: "170px", color: "#FFFFFE" }}
              startIcon={<AddIcon />}
              onClick={window.scrollTo(0, 0)}
              variant="contained"
            >
              create request
            </Button>
          </div>
        </div>

        <CacheProvider value={muiCache}>
          <Box height={595}>
            <DataGrid
              sx={{ border: 0 }}
              columns={enqColumns}
              rows={requests}
              getRowId={(row) => row.req_id}
              rowsPerPageOptions={[10, 20, 30]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
                    inset: `-17vh auto auto 25vw !important`,
                    width: "35vw",
                    "& .mui-datatables-1t5wrdm-MuiDataGrid-filterForm": {
                      width: "35vw",
                    },
                  },
                },
              }}
              onCellEditCommit={(params) => setRowId(params.id)}
            />
          </Box>
        </CacheProvider>
      </Paper>
    </ThemeProvider>
  ) : (
    login()
  );
};
