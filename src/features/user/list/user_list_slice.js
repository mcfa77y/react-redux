import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user_api } from '../user_api';
import { log_json } from '../../utils';

export const fetchUserList = createAsyncThunk(
  'users/fetchListStatus',
  async (nothing, { getState, requestId }) => {
    log_json('userListSlice.js - fetchUserList:', getState());
    const { currentRequestId, loading } = getState().user_list;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await user_api.fetch_list();
    return response;
  },
);

export const userListSlice = createSlice({
  name: 'users',
  initialState: {
    entity_list: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
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

export const selectUsers = (state) => state.user_list;
export default userListSlice.reducer;
