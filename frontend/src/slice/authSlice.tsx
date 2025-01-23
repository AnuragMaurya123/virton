/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Admin {
    id: string;
    name: string;
    email: string;
    businessPromoters: number;
    businessIncome: number;
    businessPartners: number;
}

interface AuthState {
    isAuthenticated: boolean;
    admin: Admin | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false,
    admin: JSON.parse(localStorage.getItem("admin") || "null"),
    token: localStorage.getItem("token") || null, // Assuming token should come from a separate "token" key
    loading: false,
    error: null,
};


// Async thunk for login
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

            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.admin = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        },
        checkAuth(state) {
            const token = localStorage.getItem("token");
            const admin = JSON.parse(localStorage.getItem("admin") || "null");
            if (token && admin) {
                state.isAuthenticated = true;
                state.admin = admin;
                state.token = token;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.admin = action.payload.admin; // Ensure the API returns user data       
                state.token = action.payload.token; // Ensure the API returns token
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                localStorage.setItem("isAuthenticated", "true");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Set the error message
            })
    },
});

// Export the actions
export const { logout, checkAuth } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
