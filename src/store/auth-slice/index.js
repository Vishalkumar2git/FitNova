import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const register = createAsyncThunk("auth/register",
    async (formData) => {
        const res = await axios.post('http://localhost:5000/api/path/register', formData,
            {
                withCredentials: true,
              }
         )
        return res.data;
    }
);
export const loginUser = createAsyncThunk("auth/login",
    async (formData) => {
        const res = await axios.post('http://localhost:5000/api/path/login', formData,
            {
                withCredentials: true,
              }
         )
        return res.data;
    }
);
export const checkauth = createAsyncThunk("auth/checkAuth",
    async () => {
        const res = await axios.get('http://localhost:5000/api/path/check-auth', {
            withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
        });
        
        return res.data;
    }
);

export const logout = createAsyncThunk("auth/logout",
    async () => {
        const res = await axios.post('http://localhost:5000/api/path/logout', {}, 
            {
                withCredentials: true,
            }
          );
        return res.data;
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {}


    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        
        // login credencial
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user:null;
            state.isAuthenticated = action.payload.success;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        // auth checking
        .addCase(checkauth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkauth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user:null;
            state.isAuthenticated = action.payload.success;
        }).addCase(checkauth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;