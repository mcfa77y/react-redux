import { createAsyncThunk } from '@reduxjs/toolkit';
import { user_api } from '../user_api';
import Base_Detail_Slice from '../../base_detail_slice';

class User_Detail_Slice extends Base_Detail_Slice {
  constructor() {
    super('user');
    console.log('User_Detail_Slice created');
  }

  async_thunk_fn() {
    console.log('calling album async thunk');
    return createAsyncThunk(
        `${this.base_entity_name}/fetch_entity_detail`,
        async (entity_id: number, { getState, requestId }: { getState: any, requestId: string }) => {
            const { currentRequestId, loading } = getState()[this.entity_name];
            if (loading !== 'pending' || requestId !== currentRequestId) {
                return;
            }
            const response = await user_api.fetch_by_id(entity_id);
            return response;
        },
    );
}
}


export const select_user = (state: any) => state.user_detail;
export const select_user_id = (state: any) => state.user_detail.entity.id;

export const user_detail_slice = new User_Detail_Slice();

export default user_detail_slice.slice().reducer;
