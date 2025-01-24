/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Defining the Partners interface to type the partner objects
export interface Partners {
    _id: string;
    name: string;
    email: string;
    status: boolean; 
    Phone: string; 
    Paid: boolean; 
}

// Defining the initial state for the partner slice
interface AuthState {
    partners: Partners[];
    loading: boolean; 
    error: string | null; 
}

// Initial state of the partners slice, getting data from localStorage if available
const initialState: AuthState = {
    partners: JSON.parse(localStorage.getItem("partners") || "null"), 
    loading: false, 
    error: null,
};

// Async thunk to handle the request for fetching partners data
export const getPartners = createAsyncThunk(
    "/getPartners", 
    async (__dirname, { rejectWithValue }) => { 
        try {
            // Sending GET request to fetch partners data
            const response = await axiosClient.get("/partners/getpartners");
            return response.data;
        } catch (error: any) {
            console.log(error); 
            return rejectWithValue("Failed to fetch submissions"); 
        }
    }
);

// Defining the partnerSlice using createSlice
const partnerSlice = createSlice({
    name: "partners", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            // Handling the 'pending' state when the request is being processed
            .addCase(getPartners.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            // Handling the 'fulfilled' state when the request is successful
            .addCase(getPartners.fulfilled, (state, action) => {
                state.loading = false; 
                state.partners = action.payload.partners; 
                localStorage.setItem("partners", JSON.stringify(action.payload.partners)); 
            })
            // Handling the 'rejected' state when the request fails
            .addCase(getPartners.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload as string; 
            });
    },
});

// Export the reducer for the partners slice
export const partnerReducer = partnerSlice.reducer;
