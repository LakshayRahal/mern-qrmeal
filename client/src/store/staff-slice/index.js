import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "sonner";

const initialState = {
  isLoading: false,
  qrList: [],
  claimedList:[]
};


 
export const claimQR = createAsyncThunk(
  "staff/claimQR",
  async ({ qrId, claimedBy }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/staff/qr/claim`, {
        qrId,
        claimedBy,
      });

      toast.success("Meal claimed successfully!");
      return response.data.qr;
    } catch (error) {
      toast.error(error.response?.data?.message || "Claim failed");
      throw error;
    }
  }
);

// You can manage claimed QR state in reducers if needed.

export const fetchClaimHistory = createAsyncThunk(
    "staff/fetchClaimHistory",
    async (email, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff/qr/history/${auth.user.email}`);
        return res.data.data;
      } catch (error) {
        toast.error("Failed to fetch claim history");
        return rejectWithValue(error.response?.data || "Error fetching history");
      }
    }
  );
  

  
export const fetchAllQR = createAsyncThunk(
    'staff/fetchAllQR',
    async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff/qr/get`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return result?.data;
    }
  );
  

  const staffQrSlice = createSlice({
    name: "staffQR",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllQR.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllQR.fulfilled, (state, action) => {
          state.isLoading = false;
          state.qrList = action.payload.data;
        })
        .addCase(fetchAllQR.rejected, (state) => {
          state.isLoading = false;
          state.qrList = [];
        })
        .addCase(claimQR.fulfilled, (state, action) => {
          state.qrList = state.qrList.filter(qr => qr._id !== action.payload._id);
        })
        .addCase(fetchClaimHistory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchClaimHistory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.claimedList = action.payload;
        })
        .addCase(fetchClaimHistory.rejected, (state) => {
          state.isLoading = false;
          state.claimedList = [];
        });
    },
  });
  
  export default staffQrSlice.reducer;