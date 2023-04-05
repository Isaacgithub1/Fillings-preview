import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    value: {
      currentUser: "",
      apps: [],
      isLogged: false,
    },
  },
  reducers: {
    loginData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginData } = LoginSlice.actions;
export default LoginSlice.reducer;
