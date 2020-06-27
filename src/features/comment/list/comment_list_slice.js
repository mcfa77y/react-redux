import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { comment_api } from '../comment_api';

export const fetch_comment_list_by_post_id = createAsyncThunk(
  'comments/fetch_comment_list',
  async (post_id, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().comment_list;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await comment_api.fetch_by_post_id(post_id);
    return response;
  },
);

export const comment_list_slice = createSlice({
  name: 'comments',
  initialState: {
    entity_list: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetch_comment_list_by_post_id.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetch_comment_list_by_post_id.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity_list = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetch_comment_list_by_post_id.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const select_comments = (state) => state.comment_list;
export default comment_list_slice.reducer;
