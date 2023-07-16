import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postRequest, baseUrl } from '../../utils/httpRequests';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: {
            info: 'idle',
            errorMessage: '',
        },
        info: {
            name: '',
            email: '',
            token: '',
            id: '',
        },
    },
    reducers: {
        setInfoUser(state, action) {
            state.info = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.pending, (state) => {
                state.status.info = 'pending';
            })
            .addCase(registerAccount.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.status.info = 'error';
                    state.status.errorMessage = action.payload.message;
                    return;
                }

                localStorage.setItem('user', JSON.stringify(action.payload));

                state.status.info = 'idle';
                state.info = action.payload.userInfo;
            });
    },
});

export const registerAccount = createAsyncThunk('user/registerAccount', async (registerInfo) => {
    const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

    return response;
});

export default userSlice;
