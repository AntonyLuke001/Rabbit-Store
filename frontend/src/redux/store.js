import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import productReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice'
import orderSlice from './slices/orderSlice';

const store = configureStore({
    reducer : {
        auth : authReducer,
        products : productReducer,
        cart : cartReducer,
        checkout : checkoutReducer,
        order : orderSlice
    },
});

export default store;