import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { comment_api } from '../comment_api';
import Base_List_Slice from '../../base_list_slice';

class Comment_List_Slice extends Base_List_Slice {
  constructor() {
    super('comment');
  }

  async_thunk_fn() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (post_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await comment_api.fetch_by_post_id(post_id);
        return response;
      },
    );
  }
}

export const select_comments = (state:any) => state.comment_list;

export const comment_list_slice = new Comment_List_Slice();

export default comment_list_slice.list_slice().reducer;
