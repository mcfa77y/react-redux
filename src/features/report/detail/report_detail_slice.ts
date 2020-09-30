import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Base_Slice, { Lifecycle_State } from '../../base_slice';
import { report_api } from '../report_api';

type Fetch_By_ID_Request = {
  report_id: number,
  access_token: string
}

type Update_Request = {
  data: any,
  access_token: string
}
type Update_HTML_JSON_Action = {
  payload: {
    key: string,
    value: any
  }
}

class Report_Detail_Slice extends Base_Slice {
  fetch_by_id: AsyncThunk<any, Fetch_By_ID_Request, {}>;

  update: AsyncThunk<any, Update_Request, {}>;

  constructor() {
    super('report_detail');

    this.fetch_by_id = this.fetch_by_id_async_thunk();
    this.async_thunk_list.push(this.fetch_by_id);

    this.update = this.update_async_thunk();
    // this.async_thunk_list.push(this.update);

    this.reducers = {
      update_is_shown: this.update_html_json,
    };
  }

  fetch_by_id_async_thunk(): AsyncThunk<any, any, {}> {
    return createAsyncThunk(
      `${this.entity_name}/fetch_by_id`,
      async ({ report_id, access_token }: Fetch_By_ID_Request,
        { getState, requestId, rejectWithValue }: { getState: any, requestId: any, rejectWithValue: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        try {
          const response = await report_api.fetch_by_id(report_id, access_token);
          return response;
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      },
    );
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
        const response = await report_api.update(data, access_token);
        return response;
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  update_html_json(state: Lifecycle_State, action: Update_HTML_JSON_Action) {
    const { key, value } = action.payload;
    state.entity.report.html_json[key] = value;
    return state;
  }

  // eslint-disable-next-line class-methods-use-this
  update_report_json(state: Lifecycle_State, action: Update_HTML_JSON_Action) {
    const { key, value } = action.payload;
    state.entity.report[key] = value;
    return state;
  }

  createCustomExtraReducers(async_thunk: any) {
    let extraReducers = this.createExtraReducers([async_thunk]);
    extraReducers = {
      ...extraReducers,
      [async_thunk.fulfilled]: (state: Lifecycle_State, action: any) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.entity = { ...state.entity, ...action.payload };
          state.currentRequestId = undefined;
          state.error = null;
          console.log(`FULFILLED: ${this.entity_name}`);
        }
      },
    };
    return extraReducers;
  }

  slice() {
    let extraReducers = this.createExtraReducers();
    extraReducers = {
      ...extraReducers,
      ...this.createCustomExtraReducers(this.update),
    };
    const { initialState, update_html_json, update_report_json } = this;
    return createSlice({
      name: `${this.entity_name}`,
      initialState,
      reducers: {
        update_html_json,
        update_report_json,
      },
      extraReducers,
    });
  }
}

export const select_report = (state: any) => state.report_detail;
export const select_report_name = (state: any) => state.report_detail.entity.report.name;
export const select_report_entity = (state: any) => state.report_detail.entity.report.name;
export const select_report_id = (state: any) => state.report_detail.entity.report.id;

export const report_detail_slice = new Report_Detail_Slice();
export const report_detail_slice_slice = report_detail_slice.slice();

export const {
  update_html_json,
  update_report_json,
} = report_detail_slice_slice.actions;
// export const report_detail_slice_actions = report_detail_slice_slice.actions;

export default report_detail_slice_slice.reducer;
