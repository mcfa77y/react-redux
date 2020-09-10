import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import Base_Slice from '../../base_slice';
import { customer_api } from '../customer_api';

type Fetch_By_ID_Request = {
  entity_id: number,
  access_token: string
}

type Update_Request = {
  data: any,
  access_token: string
}

class Customer_Detail_Slice extends Base_Slice {
  fetch_by_id: AsyncThunk<any, Fetch_By_ID_Request, {}>;

  update: AsyncThunk<any, Update_Request, {}>;

  constructor() {
    super('customer_detail');
    
    this.fetch_by_id = this.fetch_by_id_async_thunk();
    this.async_thunk_list.push(this.fetch_by_id);

    this.update = this.update_async_thunk();
    this.async_thunk_list.push(this.update);

    console.log('Customer_Detail_Slice created');
  }

  update_async_thunk() {
    console.log('calling customer update async thunk');
    return createAsyncThunk(
      `${this.base_entity_name}/update`,
      async ({ data, access_token }: Update_Request,
        { getState, requestId }: { getState: any, requestId: string }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await customer_api.update(data, access_token);
        return response;
      },
    );
  }

  fetch_by_id_async_thunk() {
    console.log('calling customer async thunk');
    return createAsyncThunk(
      `${this.base_entity_name}/fetch_detail`,
      async ({ entity_id, access_token }: Fetch_By_ID_Request,
        { getState, requestId }: { getState: any, requestId: string }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        const response = await customer_api.fetch_by_id(entity_id, access_token);
        return response;
      },
    );
  }
}

export const select_customer = (state: any) => state.customer_detail;
export const select_customer_id = (state: any) => state.customer_detail?.entity?.customer?.id;
export const select_customer_name = (state: any) => state.customer_detail?.entity?.customer?.name;

export const customer_detail_slice = new Customer_Detail_Slice();

export default customer_detail_slice.slice().reducer;
