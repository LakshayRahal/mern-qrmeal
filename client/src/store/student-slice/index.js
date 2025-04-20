import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  qrList: [],
};


// ADD NEW QR
export const addNewQr = createAsyncThunk("/dashboard/addnewqr",
    async (formData) => {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/student/qr/add`, 
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return result?.data;
    }
  );
  
  // FETCH ALL QR
  export const fetchAllQr = createAsyncThunk("/dashboard/fetchAllQr",
    async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/qr/get`); 
      return result?.data;
    }
  );
  
  // EDIT QR
  export const editQr = createAsyncThunk('/dashboard/editQR',
    async ({ id, formData }) => {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/student/qr/edit/${id}`, 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    }
  );
  
  // DELETE QR
  export const deleteQr = createAsyncThunk("/dashboard/deleteQr",
    async ({id}) => {
      const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/student/qr/delete/${id}`);
      return result?.data;
    }
  );
  
const StudentQrSlice = createSlice({
  name: "studentQR",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllQr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.qrList = action.payload.data;
      })
      .addCase(fetchAllQr.rejected, (state) => {
        state.isLoading = false;
        state.qrList = [];
      });
  },
});

export default StudentQrSlice.reducer;
