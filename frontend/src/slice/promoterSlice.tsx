/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Promoters {
    _id: string;
    level: number;
    name: string;
    phone: string,
    amount: string;
    status: boolean,
}

interface PromotersState {
    promoters: Promoters[];
    loading: boolean;
    error: string | null;
}

const initialState: PromotersState = {
    promoters: JSON.parse(localStorage.getItem("promoters") || "null"),
    loading: false,
    error: null,
};

// Async thunk for login
export const getPromoters = createAsyncThunk(
    "/getPromoters",
    async (__dirname,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.get("/promoters/getpromoters");
            console.log(response);
            
            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue("Failed to fetch submissions");
        }
    }
);

const promotersSlice = createSlice({
    name: "promoters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPromoters.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(getPromoters.fulfilled, (state, action) => {
                state.loading = false;
                state.promoters = action.payload.promoters; // Ensure the API returns user data       
                localStorage.setItem("promoters", JSON.stringify(action.payload.promoters));
            })
            .addCase(getPromoters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Set the error message
            })
    },
});

// Export the reducer
export const promotersReducer = promotersSlice.reducer;
