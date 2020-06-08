import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../user_api';
// import { log_json } from '../utils';

export const fetchUserList = createAsyncThunk(
    'users/fetchListStatus',
    async (nothing, { getState, requestId }) => {
        // log_json('userListSlice.js - fetchUserById:', getState());
        const { currentRequestId, loading } = getState().userList;
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return;
        }
        const response = await userAPI.fetchList();
        return response;
    },
);

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, { getState, requestId }) => {
        // log_json('userListSlice.js - fetchUserById:', getState());
        const { currentRequestId, loading } = getState().userList;
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return;
        }
        return userAPI.fetchById(userId);
    },
);

export const userListSlice = createSlice({
    name: 'users',
    initialState: {
        entity_list: [],
        entity: {},
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUserById.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.currentRequestId = action.meta.requestId;
            }
        },
        [fetchUserById.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.entity = action.payload;
                state.currentRequestId = undefined;
            }
        },
        [fetchUserById.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
            }
        },

        [fetchUserList.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.currentRequestId = action.meta.requestId;
            }
        },
        [fetchUserList.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.entity_list = action.payload;
                state.currentRequestId = undefined;
            }
        },
        [fetchUserList.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
            }
        },
    },
});


export default userListSlice.reducer;
