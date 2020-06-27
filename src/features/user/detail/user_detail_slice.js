import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user_api } from '../user_api';
// import { log_json } from '../../utils';

export const fetch_user_by_id = createAsyncThunk(
  'user/fetch_by_id',
  async (userId, { getState, requestId }) => {
    // log_json('userListSlice.js - fetchUserById:', getState());
    const { currentRequestId, loading } = getState().user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    return user_api.fetch_by_id(userId);
  },
);


export const user_details_slice = createSlice({
  name: 'user',
  initialState: {
    entity: {},
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetch_user_by_id.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetch_user_by_id.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetch_user_by_id.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

  },
});


export const selectUser = (state) => state.user;
export default user_details_slice.reducer;
