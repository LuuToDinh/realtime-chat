import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        password: '',
    },
    reducers: {
        getLoginInfo(state, action) {
            return action.payload;
        },
    },
});

export default loginSlice;
