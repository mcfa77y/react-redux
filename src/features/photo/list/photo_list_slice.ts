import { createAsyncThunk } from '@reduxjs/toolkit';
import Base_Slice from '../../base_slice';
import { photo_api } from '../photo_api';

class Photo_List_Slice extends Base_Slice {
  fetch_by_album_id: any;
  constructor() {
    super('photo_list');
    console.log('Photo_List_Slice created');
    this.fetch_by_album_id = this.async_thunk_fn();
    this.async_thunk_list.push(this.fetch_by_album_id);
  }

  async_thunk_fn() {
    console.log('calling photo async thunk');
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (album_id: number, { getState, requestId }: {getState: any, requestId: any}) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await photo_api.fetch_by_album_id(album_id);
        return response;
      },
    );
  }
}

export const photo_list_slice = new Photo_List_Slice();

export default photo_list_slice.slice().reducer;
