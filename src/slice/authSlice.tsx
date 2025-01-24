/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Defining the Admin interface to type the admin object
export interface Admin {
    _id: string;
    name: string;
    email: string;
    businessPromoters: number;
    businessIncome: number;
    businessPartners: number;
}

// Defining the initial state for the Auth slice
interface AuthState {
    isAuthenticated: boolean;
    admin: Admin | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

// Initial state of the authentication slice, getting values from localStorage if available
const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false,
    admin: JSON.parse(localStorage.getItem("admin") || "null"),
    token: localStorage.getItem("token") || null, // Assuming token should come from a separate "token" key
    loading: false,
    error: null,
};

// Async thunk to handle login API request
export const loginUser = createAsyncThunk(
    "/loginUser",
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.post("/admin/login", credentials);
            return response.data;
        } catch (error: any) {
            console.log(error);
            // Return error message in case of failed login
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Defining the auth slice using createSlice
const authSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        // Reducer to handle logout action
        logout(state) {
            state.isAuthenticated = false;
            state.admin = null;
            state.token = null;
            // Removing data from localStorage upon logout
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        },
        // Reducer to check the authentication status from localStorage
        checkAuth(state) {
            const token = localStorage.getItem("token");
            const admin = JSON.parse(localStorage.getItem("admin") || "null");
            if (token && admin) {
                // If both token and admin exist, set authenticated state to true
                state.isAuthenticated = true;
                state.admin = admin;
                state.token = token;
            }
        },
    },
    extraReducers: (builder) => {
        // Handling different states of the login async thunk
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.admin = action.payload.admin; 
                state.token = action.payload.token;
                // Store token and admin data in localStorage for persistence
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                localStorage.setItem("isAuthenticated", "true");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; 
            });
    },
});

// Export the actions to be used in other parts of the application
export const { logout, checkAuth } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
