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
    inset: `-5px auto auto 350px`,
  },
  "& .MuiDataGrid-panel": {
    inset: `-1px auto auto 350px`,
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

const inputBoxAdminAction = {
  // margin: "0 auto",
  "& .MuiTextField-root": {
    m: 2,
    // borderRadius:'15px',
    backgroundColor: "#fffffe",
    borderRadius: "2px",
    width: "23ch",
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    backgroundColor: "#fffffe",
  },
  "& .MuiAutocomplete-popupIndicator": {
    display: "none !important",
  },
  "&  .MuiFormHelperText-root.Mui-error": {
    background: "#fffffe",
    margin: 0,
    paddingLeft: 10,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
  },
  // marginLeft: "70px",
  justifyContent: "center",
  // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  // bgcolor: "#094067",
  // left: "-170px",
  // top: ".8rem",
  width: "800px",
  // height: {heightBox},
  flexGrow: 1,
  position: "relative",
  borderRadius: "10px",
  // ml:"180px"
};

export {inputBox,inputBoxAdminAction}