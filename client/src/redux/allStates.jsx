import { createSlice } from "@reduxjs/toolkit";

const list = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/register",
    name: "Register",
  },
  {
    path: "/cart",
    name: "Cart",
  },
  {
    path: "/shop",
    name: "Shop",
  },
  {
    path: "/orders",
    name: "Orders",
  },
];

const validateActivePage = (page) => {
  return list.find((item) => item.path === page);
};

const allStates = createSlice({
  name: "allStates",
  initialState: {
    username: "",
    password: "",
    activePage:
      validateActivePage(window.location.pathname)?.name || "NotFound",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setUsername, setPassword, setActivePage } = allStates.actions;
export default allStates;
