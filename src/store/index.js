import { configureStore } from '@reduxjs/toolkit';
import policyReducer from './slices/PolicySlice'

const store = configureStore({
    reducer: {
        policies: policyReducer,
    },
});
export default store;