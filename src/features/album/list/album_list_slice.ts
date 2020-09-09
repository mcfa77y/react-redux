import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import Base_Slice from '../../base_slice';
import { album_api } from '../album_api';

class Album_List_Slice extends Base_Slice {
  fetch_by_user_id: AsyncThunk<any, number, {}>;
  fetch_all: AsyncThunk<any, void, {}>;
  
  constructor() {
    super('album_list');
    console.log('Album_List_Slice created');
    
    this.fetch_by_user_id = this.fetch_by_user_id_async_thunk();
    this.async_thunk_list.push(this.fetch_by_user_id);
    
    this.fetch_all = this.fetch_all_async_thunk();
    this.async_thunk_list.push(this.fetch_all);
  }

  fetch_by_user_id_async_thunk() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_filtered_list`,
      async (user_id: number, { getState, requestId }: {getState: any, requestId: any}) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await album_api.fetch_by_user_id(user_id);
        return response;
      },
    );
  }

  fetch_all_async_thunk() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_list`,
      async ({}, { getState, requestId }: {getState: any, requestId: any}) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await album_api.fetch_all();
        return response;
      },
    );
  }
}

export const album_list_slice = new Album_List_Slice();

export default album_list_slice.slice().reducer;
