import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const User = createSlice({
  name: "User",
  initialState: {
    authorized: Cookies.get("UserAuth") === "true",
    userData: Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
      Cookies.set("userData", JSON.stringify(action.payload));
      console.log("Data added to cookie");
    },
    login: (state) => {
      state.authorized = true;
      Cookies.set("UserAuth", "true");
      console.log("User logged in");
    },
    logout: (state) => {
      state.authorized = false;
      state.userData = null;
      Cookies.remove("UserAuth");
      Cookies.remove("userData");
      console.log("User logged out");
    },
  },
});

export const { addUser, login, logout } = User.actions;
export default User.reducer;
