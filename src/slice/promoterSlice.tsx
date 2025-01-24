/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Defining the Promoters interface to type the promoters objects
export interface Promoters {
    _id: string; 
    level: number; 
    name: string; 
    phone: string; 
    amount: string; 
    status: boolean;
}

// Defining the state for the promoters slice
interface PromotersState {
    promoters: Promoters[]; 
    loading: boolean; 
    error: string | null; 
}

// Initial state, loading promoters from localStorage if available
const initialState: PromotersState = {
    promoters: JSON.parse(localStorage.getItem("promoters") || "null"), 
    loading: false, 
    error: null, 
};

// Async thunk to fetch promoters data from the API
export const getPromoters = createAsyncThunk(
    "/getPromoters", 
    async (__dirname, { rejectWithValue }) => {
        try {
            // Sending GET request to fetch the promoters data
            const response = await axiosClient.get("/promoters/getpromoters");
            
            return response.data; 
        } catch (error: any) {
            console.log(error); // Log the error
            return rejectWithValue("Failed to fetch submissions"); 
        }
    }
);

// Defining the promotersSlice using createSlice
const promotersSlice = createSlice({
    name: "promoters", 
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            // Handling the 'pending' state when the request is in progress
            .addCase(getPromoters.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            // Handling the 'fulfilled' state when the request is successful
            .addCase(getPromoters.fulfilled, (state, action) => {
                state.loading = false;
                state.promoters = action.payload.promoters;
                localStorage.setItem("promoters", JSON.stringify(action.payload.promoters)); 
            })
            // Handling the 'rejected' state when the request fails
            .addCase(getPromoters.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload as string; 
            });
    },
});

// Export the reducer for the promoters slice
export const promotersReducer = promotersSlice.reducer;
