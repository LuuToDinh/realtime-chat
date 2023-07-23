import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRequest, baseUrl, postRequest } from '../../utils/httpRequests';

const chatSlice = createSlice({
    name: 'message',
    initialState: {
        status: {
            info: 'idle',
            errorMessage: '',
        },
        info: {
            userChats: [],
            potentialUserChats: [],
            currentChat: {},
        },
    },
    reducers: {
        updateCurrentChat: (state, action) => {
            state.info.currentChat = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserChats.pending, (state) => {
                state.status.info = 'pending';
            })
            .addCase(getUserChats.fulfilled, (state, action) => {
                if (action.payload) {
                    if (action.payload.error) {
                        state.status.info = 'error';
                        state.status.errorMessage = action.payload.message;
                        return;
                    }

                    localStorage.setItem(
                        'userChats',
                        JSON.stringify({
                            status: {
                                info: 'idle',
                                errorMessage: '',
                            },
                            info: {
                                userChats: action.payload,
                            },
                        }),
                    );

                    state.status.info = 'idle';
                    state.info.userChats = action.payload;
                }
            });
        builder.addCase(createUserChat.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.response.error) {
                    state.status.info = 'error';
                    state.status.errorMessage = action.payload.response.message;
                    return;
                }

                state.info.potentialUserChats.splice(action.payload.indexRemove, 1);
                state.info.userChats.push(action.payload.response);
            }
        });
        builder.addCase(getPotentialUserChats.fulfilled, (state, action) => {
            const userLogging = action.payload?.user;
            const response = action.payload?.response;
            const userChats = action.payload?.userChats;

            if (action.payload) {
                if (response?.error) {
                    console.log('Error fetching users', response);
                    return;
                }

                const potentialChats = response?.filter((user) => {
                    let isChatCreated = false;

                    if (userLogging._id === user._id) {
                        return false;
                    }

                    isChatCreated = userChats.some(
                        (chat) => chat.members[0] === user._id || chat.members[1] === user._id,
                    );

                    return !isChatCreated;
                });

                state.info.potentialUserChats = potentialChats;
            }
        });
    },
});

export const getUserChats = createAsyncThunk('chat/getUserChats', async (user) => {
    let response = null;

    if (user?._id) {
        response = await getRequest(`${baseUrl}/chats/${user._id}`);
    }

    return response;
});

export const createUserChat = createAsyncThunk('chat/createUserChat', async ({ firstId, secondId, indexRemove }) => {
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secondId }));

    return {
        response,
        indexRemove,
    };
});

export const getPotentialUserChats = createAsyncThunk('chat/getPotentialUserChats', async ({ user, userChats }) => {
    const response = await getRequest(`${baseUrl}/api/users`);

    return {
        response,
        user,
        userChats,
    };
});

export default chatSlice;
