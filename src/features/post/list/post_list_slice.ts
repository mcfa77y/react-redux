import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';
import Base_List_Slice from '../../base_list_slice';

class Post_List_Slice extends Base_List_Slice {
  constructor() {
    super('post');
  }

  async_thunk_fn(): AsyncThunk<any, number, {}> {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (user_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await post_api.fetch_by_user_id(user_id);
        return response;
      },
    );
  }
}


export const select_posts = (state: any) => state.post_list;


export const post_list_slice = new Post_List_Slice();

export default post_list_slice.list_slice().reducer;
