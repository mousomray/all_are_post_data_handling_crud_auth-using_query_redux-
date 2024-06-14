import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
    loading: false,
    user: {}, // for user object
    Logouttoggle: false, // For Logout Button 
    userName: false,
}

export const registerUser = createAsyncThunk("/signup", async (user) => {
    try {
        const apiurl = "user/signup"
        const response = await axiosInstance.post(apiurl, user);
        if (response && response?.data?.status === 200) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        console.log(" Fetching Register data", response);
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log("Error fetching Register data", error);
    }
});

export const loginRequest = createAsyncThunk("login", async (user) => {
    try {
        const apiurl = "user/signin"
        const response = await axiosInstance.post(apiurl, user);
        if (response && response?.data?.status === 200) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        console.log("Fetching Login Data", response);
        return response?.data;
    } catch (error) {
        console.log("Error fetching login data", error);
        toast.error(error?.response?.data?.message);
        console.log(error);
    }
});



export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        //check for auth token 
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("token");
            if (token !== null && token !== undefined) {
                state.Logouttoggle = true;
            }
        },

        logout: (state, { payload }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("proimg");
            toast.success("Logout successfully")
            state.Logouttoggle = false

        },


        // For to go Register page after keeping token in local storage 
        RegLog: (state, { payload }) => {
            localStorage.removeItem("name");
            state.Logouttoggle = false

        },


    },

    extraReducers: (builder) => {
        // Register User
        builder

            //For Registration Pending
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //For Registration Fulfilled
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;

                console.log("My Reg payload", payload);

                if (payload && payload.status === 200) { // Check if payload exists
                    localStorage.setItem("name", payload.data.first_name);
                    toast.success(`Hi ${payload?.data?.first_name}, ${payload?.message}`);
                }
            })

            //For Registration Reject
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });


        // Login Request
        builder
            .addCase(loginRequest.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginRequest.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 200) {
                    localStorage.setItem("token", payload?.token);
                    localStorage.setItem("name", payload?.data.first_name);
                    // localStorage.setItem("last_name", payload?.data.last_name);
                    // localStorage.setItem("email", payload?.data.email);
                    localStorage.setItem("proimg", payload?.data?.profile_pic)
                    state.Logouttoggle = true;
                    toast.success(`Hi ${payload?.data.first_name}, ${payload?.message}`);
                }
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
            });
    }

})

export const { check_token, logout, RegLog } = AuthSlice.actions