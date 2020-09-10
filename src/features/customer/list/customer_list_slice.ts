import { createAsyncThunk } from '@reduxjs/toolkit';
import { customer_api } from '../customer_api';
import Base_List_Slice from '../../base_list_slice';



class Customer_List_Slice extends Base_List_Slice {
  constructor() {
    super('customer');
  }

  async_thunk_fn() {
    return createAsyncThunk(
      `${this.entity_name}/fetch_entity_list`,
      async (access_token: string, { getState, requestId }: { getState: any, requestId: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await customer_api.fetch_list(access_token);
        return response;
      },
    );
  }
}



export const select_customer_list = (state:any) => state.customer_list;

export const customer_list_slice = new Customer_List_Slice();

export default customer_list_slice.list_slice().reducer;

