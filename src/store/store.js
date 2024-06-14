import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import showdetails from "../Pages/pageslice"
import {singledetails} from "../Pages/pageslice"


export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        Showproduct: showdetails,
        Single: singledetails.reducer
    },
});