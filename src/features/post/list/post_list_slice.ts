import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';
import Base_Slice from '../../base_slice';

class Post_List_Slice extends Base_Slice {
  fetch_all: AsyncThunk<any, any, {}> ;
  fetch_by_user_id: AsyncThunk<any, number, {}>;
  
  constructor() {
    super('post_list');
    this.fetch_by_user_id = this.fetch_by_user_id_async_thunk();
    this.async_thunk_list.push(this.fetch_by_user_id)
    
    this.fetch_all = this.fetch_all_async_thunk();
    this.async_thunk_list.push(this.fetch_all);
  }

  fetch_by_user_id_async_thunk(): AsyncThunk<any, number, {}> {
    return createAsyncThunk(
      `${this.entity_name}/fetch_filter_entity_list`,
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

  fetch_all_async_thunk(): AsyncThunk<any, any, {}> {
    return createAsyncThunk(
      `${this.entity_name}/fetch_all_entity_list`,
      async ({}, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await post_api.fetch_list();
        return response;
      },
    );
  }
}


export const select_posts = (state: any) => state.post_list;


export const post_list_slice = new Post_List_Slice();

export default post_list_slice.slice().reducer;
