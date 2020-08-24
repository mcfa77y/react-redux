import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Todo_API from '../todo_api';
import { log_json } from '../../utils';
import Base_List_Slice from '../../base_list_slice';

const todo_api = new Todo_API();

class Todo_List_Slice extends Base_List_Slice {
  constructor() {
    super('todo');
  }

  async_thunk_fn() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (user_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await todo_api.fetch_by_attr_id('userId', user_id);
        return response;
      },
    );
  }
}


export const select_todo_list = (state:any) => state.todo_list;

export const todo_list_slice = new Todo_List_Slice();

export default todo_list_slice.list_slice().reducer;
