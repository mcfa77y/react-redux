import { createAsyncThunk } from '@reduxjs/toolkit';
import Base_List_Slice from '../../base_list_slice';
import { album_api } from '../album_api';

class Album_List_Slice extends Base_List_Slice {
  constructor() {
    super('album');
    console.log('Album_List_Slice created');
  }

  async_thunk() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (user_id, { getState, requestId }) => {
        const { currentRequestId, loading } = getState().album_list;
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await album_api.fetch_by_user_id(user_id);
        return response;
      },
    );
  }
}
export const album_list_slice = new Album_List_Slice();

export default album_list_slice.list_slice().reducer;
