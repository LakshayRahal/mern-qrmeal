import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "sonner";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};



export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      console.log("Registering User: ", formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

     
      return response.data; 
    } catch (error) {
     
      const errorMessage = error?.response?.data?.message || "Unknown error occurred";

      
      return thunkAPI.rejectWithValue({
        success: false,  
        message: errorMessage, 
      });
    }
  }
);






export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    let response;

    if (formData?.email && formData?.password) {
      // Manual login using email/password
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`, 
        formData, 
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("Logged in via manual method:", response.data);
      }
    } else if (formData?.email && formData?.fromOAuth) {
      // Microsoft OAuth login
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`, 
        formData, 
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("Logged in via Microsoft OAuth:", response.data);
      }
    }

    // Return the response data (user data) from backend
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error?.response?.data?.message || "Login failed.",
    });
  }
});





export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  console.log(response.data);
  return response.data;
});

// Check Auth
export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state,action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.errorMessage = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        console.log(state.user);
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(loginUser.rejected, (state,action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Login failed.";
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
