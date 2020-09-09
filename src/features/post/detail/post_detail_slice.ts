/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';
import Base_Slice from '../../base_slice';

class Post_Detail_Slice extends Base_Slice {
  fetch_by_id: any;
  constructor() {
      super('post_detail');
      this.fetch_by_id = this.async_thunk_fn();
      this.async_thunk_list.push(this.fetch_by_id)
  }

  async_thunk_fn() {
      console.log('calling album async thunk');
      return createAsyncThunk(
          `${this.entity_name}/fetch_entity_detail`,
          async (entity_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
              const { currentRequestId, loading } = getState()[this.entity_name];
              if (loading !== 'pending' || requestId !== currentRequestId) {
                  return;
              }
              const response = await post_api.fetch_by_id(entity_id);
              return response;
          },
      );
  }
}



export const select_post = (state:any) => state.post_detail;
export const select_post_id = (state:any) => state.post_detail.response.id;

export const post_detail_slice = new Post_Detail_Slice();

export default post_detail_slice.slice().reducer;
