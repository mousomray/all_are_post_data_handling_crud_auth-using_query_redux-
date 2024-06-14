import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for Add Product
export const addproduct = createAsyncThunk("addproduct", async (data, { rejectWithValue }) => {
    try {
        const apiurl = "product/create"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add Product data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add Product data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Show Product
export const showproduct = createAsyncThunk("showproduct", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'product/list'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching show data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching show data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice for show product area start
const showdetails = createSlice({
    name: "showdetails",
    initialState: {
        showdata: [],
        totalpage: "", // Make For Pagination 
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(showproduct.pending, (state) => {
                state.loading = true;
            })

            .addCase(showproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.showdata = action.payload.data;
                state.totalpage = action.payload.totalPages; // For Pagination
            })

            .addCase(showproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default showdetails.reducer;

// Call Api for Details Product 
export const detailsproduct = createAsyncThunk("detailsproduct", async (id, { rejectWithValue }) => {
    try {
      const apiurl = `product/detail/${id}`
      const response = await axiosInstance.get(apiurl);
      console.log("Fetching Details Product data", response);
      return response?.data?.data;
    } catch (error) {
      console.log("Error Fetching Details Product data", error);
      return rejectWithValue(error.response.data);
    }
  });

  // Create Slice For Details Product
const singledetails = createSlice({
    name: "singledetails",
    initialState: {
        singledata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(detailsproduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(detailsproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.singledata = action.payload;
            })
            .addCase(detailsproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});
 export {singledetails}
 

// Call Api for Delete Product
export const deleteproduct = createAsyncThunk("deleteproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = 'product/remove'
        const response = await axiosInstance.post(apiurl, { id });
        console.log("Fetching Delete Product data", response);
        toast.warning(response?.data?.message)
        return response?.data
    } catch (error) {
        console.log("Error Fetching Delete Product data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Edit Product
export const editproduct = createAsyncThunk("editproduct", async (data, { rejectWithValue }) => {
    try {
        const apiurl = "product/update"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Edit Product data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Edit Product data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Dashboard
export const profile = createAsyncThunk("profile", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'user/profile-details'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching profile data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching profile data", error);
        return rejectWithValue(error.response.data);
    }
});