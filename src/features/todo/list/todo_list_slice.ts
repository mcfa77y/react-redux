import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Todo_API from '../todo_api';
import { log_json } from '../../utils';
import Base_Slice from '../../base_slice';

const todo_api = new Todo_API();

class Todo_List_Slice extends Base_Slice {
  fetch_by_user_id: any;
  constructor() {
    super('todo_list');
    this.fetch_by_user_id = this.async_thunk_fn();
    this.async_thunk_list.push(this.fetch_by_user_id);
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

export default todo_list_slice.slice().reducer;
