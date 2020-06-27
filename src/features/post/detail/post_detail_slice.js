/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';

export const fetch_post_by_id = createAsyncThunk(
  'post/fetch_by_id',
  async (post_id, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().post;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    return post_api.fetch_by_id(post_id);
  },
);


export const post_details_slice = createSlice({
  name: 'post',
  initialState: {
    entity: {},
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetch_post_by_id.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetch_post_by_id.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetch_post_by_id.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

  },
});


export const select_post = (state) => state.post;
export default post_details_slice.reducer;
