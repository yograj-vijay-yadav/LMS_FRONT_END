import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn:localStorage.getItem("isLoggedIn") ? true : false,
  role:localStorage.getItem("role") ? localStorage.getItem("role") : "",
  data:localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {},

};  

const authSlice = createSlice({
  name: "auth",
  initialState,     
  reducers:{},
})

export const {} = authSlice.actions;
export default authSlice.reducer;
