import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}
export const addProduct = createAsyncThunk('/product/addProduct', (async (FormData) => {
    const result = await axios.post('http://localhost:5000/api/admin/product/add', FormData,  {
        headers: {
          "Content-Type": "application/json",
        },
      });
    return result?.data

}));
export const fetchProduct = createAsyncThunk('/product/fetchProduct', (async () => {
    const result = await axios.get('http://localhost:5000/api/admin/product/fetch')
    return result?.data

}));
export const editProduct = createAsyncThunk('/product/editProduct', (async ({ id, FormData }) => {
    const result = await axios.put(`http://localhost:5000/api/admin/product/update/${id}`, FormData,{
        
            headers: {
              "Content-Type": "application/json",
            },
          
    });
    return result?.data

}));
export const deleteProduct = createAsyncThunk('/product/deleteProduct', (async ({ id }) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/product/delete/${id}`)

    return result?.data

}));


const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.data;
        }).addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
    },
});

export default AdminProductSlice.reducer;