import { configureStore } from "@reduxjs/toolkit";
import allStates from "./allStates";

const store = configureStore({
  reducer: {
    allStates: allStates.reducer,
  },
});

export default store;
