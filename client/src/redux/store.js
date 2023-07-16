import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices';

const store = configureStore({
    reducer: {
        userInfo: userSlice.reducer,
    },
});

export default store;
