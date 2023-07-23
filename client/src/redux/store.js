import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices';
import { chatSlice } from './slices';

const store = configureStore({
    reducer: {
        userInfo: userSlice.reducer,
        userChats: chatSlice.reducer,
    },
});

export default store;
