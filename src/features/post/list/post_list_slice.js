import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';

export const fetch_post_list_by_user_id = createAsyncThunk(
  'posts/fetch_post_list',
  async (user_id, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().post_list;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await post_api.fetch_by_user_id(user_id);
    return response;
  },
);

export const post_list_slice = createSlice({
  name: 'posts',
  initialState: {
    entity_list: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetch_post_list_by_user_id.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetch_post_list_by_user_id.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entity_list = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetch_post_list_by_user_id.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const select_posts = (state) => state.post_list;
export default post_list_slice.reducer;
