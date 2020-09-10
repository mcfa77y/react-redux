import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { report_api } from '../report_api';
import Base_Slice from '../../base_slice';

type Fetch_By_Customer_ID_Request = {
    customer_id: number,
    access_token: string
}
type Delete_Request = {
    id_list: number[],
    access_token: string
}

type Fetch_All_Request = {
    access_token: string
}

class Report_List_Slice extends Base_Slice {
    fetch_by_customer_id: AsyncThunk<any, any, {}>;

    delete: AsyncThunk<any, any, {}>;

    fetch_all: AsyncThunk<any, any, {}>;

    constructor() {
      super('report_list');

      this.fetch_by_customer_id = this.fetch_by_customer_id_async_thunk();
      this.async_thunk_list.push(this.fetch_by_customer_id);

      this.fetch_all = this.fetch_all_async_thunk();
      this.async_thunk_list.push(this.fetch_all);

      this.delete = this.delete_async_thunk();
      this.async_thunk_list.push(this.delete);

      console.log('Report_List_Slice created');
    }

    fetch_all_async_thunk(): AsyncThunk<any, any, {}> {
      return createAsyncThunk(
        `${this.entity_name}/fetch_list`,
        async ({ access_token }: Fetch_All_Request,
          { getState, requestId }: { getState: any, requestId: any }) => {
          //   const { currentRequestId, loading } = getState()[this.entity_name];
          //   if (loading !== 'pending' || requestId !== currentRequestId) {
          //     return;
          //   }
          const response = await report_api.fetch_list(access_token);
          return response;
        },
      );
    }

    delete_async_thunk(): AsyncThunk<any, any, {}> {
      return createAsyncThunk(
        `${this.entity_name}/delete`,
        async ({ id_list, access_token }: Delete_Request,
          { getState, requestId, rejectWithValue }: { getState: any, requestId: any, rejectWithValue: any }) => {
          const { currentRequestId, loading, entity } = getState()[this.entity_name];
          if (loading !== 'pending' || requestId !== currentRequestId) {
            return;
          }
          try {
            const response = await report_api.delete(id_list, access_token);
            if (response.success) {
              const id_set = new Set(id_list);
              response.report_list = entity.report_list.filter((report: any) => !id_set.has(report.id));
            } else {
              response.report_list = entity.report_list;
            }
            return response;
          } catch (err) {
            return rejectWithValue(err.response.data);
          }
        },
      );
    }

    fetch_by_customer_id_async_thunk(): AsyncThunk<any, any, {}> {
      return createAsyncThunk(
        `${this.entity_name}/fetch_by_customer_id_list`,
        async ({ customer_id, access_token }: Fetch_By_Customer_ID_Request,
          { getState, requestId }: { getState: any, requestId: any }) => {
          const { currentRequestId, loading } = getState()[this.entity_name];
          if (loading !== 'pending' || requestId !== currentRequestId) {
            return;
          }
          const response = await report_api.fetch_by_customer_id(customer_id, access_token);
          return response;
        },
      );
    }
}

export const select_reports = (state: any) => state.report_list;

export const report_list_slice = new Report_List_Slice();

export default report_list_slice.slice().reducer;
