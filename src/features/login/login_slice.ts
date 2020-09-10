import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login_api } from './login_api';
// import { log_json } from '../../utils';
// import Base_List_Slice from '../../base_list_slice';

class Login_Slice {
    entity_name: string;

    base_entity_name: string;

    async_thunk: any;

    constructor() {
      const entity_name = 'login';
      console.log(`Login slice: ${entity_name}`);

      this.entity_name = `${entity_name}`;
      this.base_entity_name = entity_name;
      this.async_thunk = this.async_thunk_fn();
    }

    async_thunk_fn() {
      const typePrefix = `${this.entity_name}/login`;
      const payloadCreator = async ({ email, password }: { email: string, password: string },
        { getState, requestId, rejectWithValue }: { getState: any, requestId: any, rejectWithValue: any }) => {
        const { currentRequestId, loading } = getState()[this.entity_name];
        if (loading !== 'pending' || requestId !== currentRequestId) {
          return;
        }
        try {
          const response = await login_api.login(email, password);
          return response;
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      };
      return createAsyncThunk(typePrefix, payloadCreator);
    }

    list_slice() {
      return createSlice({
        name: `${this.entity_name}`,
        initialState: {
          entity_detail: {},
          loading: 'idle',
          currentRequestId: undefined,
          error: null,
        },
        reducers: {},
        extraReducers: {
          [this.async_thunk.pending]: (state, action) => {
            if (state.loading === 'idle') {
              state.loading = 'pending';
              state.entity_detail = {};
              state.error = null;
              state.currentRequestId = action.meta.requestId;
            }
          },
          [this.async_thunk.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
              state.loading = 'idle';
              state.entity_detail = action.payload;
              state.error = null;
              state.currentRequestId = undefined;
            }
          },
          [this.async_thunk.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
              state.loading = 'idle';
              state.entity_detail = action.payload;
              state.error = action.error;
              state.currentRequestId = undefined;
            }
          },
        },
      });
    }
}

export const select_login = (state: any) => state.login;
export const select_login_access_token = (state: any) => state.login.entity_detail.accessToken;
export const select_login_refresh_token = (state: any) => state.login.entity_detail.refreshToken;
export const select_login_user_role_code = (state: any) => state.login.entity_detail.user.role_code_list;
export const select_login_user_nv = (state: any) => state.login.entity_detail.user.network_view_id_list;

export const login_slice = new Login_Slice();

export default login_slice.list_slice().reducer;
