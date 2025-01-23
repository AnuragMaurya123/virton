/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Partners {
    _id: string;
    name: string;
    email: string;
    status: boolean,
    Phone: string,
    Paid: boolean,
}

interface AuthState {
    partners: Partners[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    partners: JSON.parse(localStorage.getItem("partners") || "null"),
    loading: false,
    error: null,
};

// Async thunk for login
export const getPartners = createAsyncThunk(
    "/getPartners",
    async (__dirname,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.get("/partners/getpartners");
            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue("Failed to fetch submissions");
        }
    }
);

const partnerSlice = createSlice({
    name: "partners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPartners.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(getPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.partners = action.payload.partners; // Ensure the API returns user data       
                localStorage.setItem("partners", JSON.stringify(action.payload.partners));
            })
            .addCase(getPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Set the error message
            })
    },
});

// Export the reducer
export const partnerReducer = partnerSlice.reducer;
