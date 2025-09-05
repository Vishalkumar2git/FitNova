import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./productSlice";
import AdminOrderSlice from "./admin/ordersSlice";
import shoppingProductSlice from "./shopping/shopSlice";
import shoppingCartSlice from "./shopping/cartSlice";
import addressSlice from "./shopping/addressSlice";
import shoppingOrderSlice from "./shopping/orderSlice";
import SearchSlice from "./shopping/searchSlice";
import shoppingReviewSlice from "./shopping/reviewSlice";
import featureSlice from "./admin/featureSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: AdminProductSlice,
        adminOrder : AdminOrderSlice,
        shoppingProducts: shoppingProductSlice,
        shoppingCart : shoppingCartSlice,
        shoppingAddress : addressSlice,
        shoppingOrders : shoppingOrderSlice,
        shopSearch : SearchSlice,
        shopReview: shoppingReviewSlice,
        commonSlice : featureSlice,


    },
});



export default store;