/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { post_api } from '../post_api';
import Base_Detail_Slice from '../../base_detail_slice';

class Post_Detail_Slice extends Base_Detail_Slice {
  constructor() {
      super('post');
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
export const select_post_id = (state:any) => state.post_detail.entity.id;

export const post_detail_slice = new Post_Detail_Slice();

export default post_detail_slice.slice().reducer;
