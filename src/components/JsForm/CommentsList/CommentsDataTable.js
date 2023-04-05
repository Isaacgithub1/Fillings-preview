import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useValue } from "../../../Context/ContextProvider";
import { cmdgetRequests } from "../../../Context/actions";

export const CommentsDataTable = ({ params, rowId }) => {
  const columns = useMemo(() => [
    {
      field: "commented_at",
      headerAlign: "center",
      align: "center",
      headerName: "Comment Date",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        // console.log("value", params);
        return params.value.toString();
      },

      renderCell: (params) => {
        const date = params.row.commented_at;
        const color = date === today ? "" : "#80808045";
        return (
          <div
            style={{
              backgroundColor: color,
              border: "1px",
              padding: "15px",
              width: "60rem",
              position: "absolute",
              borderRadius: "5px",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {date}
          </div>
        );
      },
    },
    {
      field: "comments",
      headerAlign: "center",
      align: "center",
      editable: true,
      headerName: "Comments",
      width: 350,
    },
  ]);

  const today = new Date().toLocaleDateString("en-GB");

  const {
    state: { cmdrequests },
  } = useValue();

  let cmdData = cmdrequests.filter((list) => list.job_support_id === rowId);

  //   console.log("cmd", rowId);
  return (
    <Box sx={{ height: 330, width: "100%" }}>
      <DataGrid
        rows={cmdData}
        columns={columns}
        disableRowSelectionOnClick
        isCellEditable={(params) => params.row.commented_at === today}
        sx={{
          "& .css-17jjc08-MuiDataGrid-footerContainer": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};
