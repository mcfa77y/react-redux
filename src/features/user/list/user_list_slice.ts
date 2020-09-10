import { createAsyncThunk } from '@reduxjs/toolkit';
import { user_api } from '../user_api';
import Base_List_Slice from '../../base_list_slice';



class User_List_Slice extends Base_List_Slice {
  constructor() {
    super('user');
  }

  async_thunk_fn() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (user_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await user_api.fetch_list();
        return response;
      },
    );
  }
}



export const select_user_list = (state:any) => state.user_list;

export const user_list_slice = new User_List_Slice();

export default user_list_slice.list_slice().reducer;

