import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cartItems: [],
    isLoading: false,

};

export const addCart = createAsyncThunk('cart/addCart', async ({ userId, productId, quantity }) => {
    const res = await axios.post('http://localhost:5000/api/shop/cart/add', {
        userId, productId, quantity,
    });
    return res.data;
});
export const fetchCartItem = createAsyncThunk('cart/fetchCartItem', async (userId) => {
    const res = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`

    );
    return res.data
});
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async ({ userId, productId, quantity }) => {
    const res = await axios.put(`http://localhost:5000/api/shop/cart/update-cart`, {
        userId, productId, quantity,
    });
    return res.data
});
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, productId }) => {
    const res = await axios.delete(`http://localhost:5000/api/shop/cart/delete/${userId}/${productId} `);
    return res.data
})


const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(fetchCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartQuantity.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });

    },
});


export default shoppingCartSlice.reducer;
