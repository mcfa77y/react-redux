import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { user_api } from '../user_api';
import Base_Slice from '../../base_slice';



class User_List_Slice extends Base_Slice {
  fetch_all: AsyncThunk<{}, any, {}>;
  
  constructor() {
    super('user_list');

    this.fetch_all = this.fetch_all_async_thunk()
    this.async_thunk_list.push(this.fetch_all);
  }

  fetch_all_async_thunk() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_list`,
      async ({}, { getState, requestId, rejectWithValue }: { getState: any, requestId: any, rejectWithValue: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        try{
          const response = await user_api.fetch_all();
          return response;
        }
        catch (err) {
          return rejectWithValue(err.response.data);
        }
      },
    );
  }
}



export const select_user_list = (state:any) => state.user_list;

export const user_list_slice = new User_List_Slice();

export default user_list_slice.slice().reducer;

