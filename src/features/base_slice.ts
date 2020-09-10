/* eslint-disable class-methods-use-this */
import { createSlice, Slice, AsyncThunk } from '@reduxjs/toolkit';

export type Lifecycle_State = {
  entity: any;
  loading: string;
  currentRequestId: undefined;
  error: null;
};

export type Foo = {
  key: string,
  value: AsyncThunk<any, any, {}>
};

abstract class Base_Slice {
  base_entity_name: string;

  entity_name: string;

  async_thunk_list: any[];

  reducers: {}
  initialState: Lifecycle_State;


  constructor(entity_name: string) {
    console.log(`Base slice: ${entity_name}`);

    this.base_entity_name = entity_name;
    this.entity_name = `${entity_name}`;
    this.async_thunk_list = [];
    this.reducers = {};
    this.initialState = {
      entity: {},
      loading: 'idle',
      currentRequestId: undefined,
      error: null,
    };
  }

  push_async_thunk_list(async_thunk_fn: any) {
    const fn = async_thunk_fn;
    this.async_thunk_list.push(fn);
    return fn;
  }

  createExtraReducers(async_thunk_list: any[] = this.async_thunk_list) {
    const extraReducers = async_thunk_list
      .reduce((acc, async_thunk) => {
        const async_thunk_lifecycle = {
          [async_thunk.pending]: (state: Lifecycle_State, action: any) => {
            if (state.loading === 'idle') {
              state.loading = 'pending';
              // state.entity = {};
              state.currentRequestId = action.meta.requestId;
              state.error = null;
              console.log("PENDING: " + this.entity_name);

            }
          },
          [async_thunk.fulfilled]: (state: Lifecycle_State, action: any) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
              state.loading = 'idle';
              state.entity = action.payload;
              state.currentRequestId = undefined;
              state.error = null;
              console.log("FULFILLED: " + this.entity_name);
            }
          },
          [async_thunk.rejected]: (state: Lifecycle_State, action: any) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
              state.loading = 'idle';
              // state.entity = {};
              state.error = action.error;
              state.currentRequestId = undefined;
              console.log("REJECTED: " + this.entity_name);
            }
          },
        };
        acc = { ...acc, ...async_thunk_lifecycle };
        return acc;
      }, {});
    return extraReducers;
  }

  slice(): Slice<Lifecycle_State, any, string> {
    const extraReducers = this.createExtraReducers();

    return createSlice({
      name: `${this.entity_name}`,
      initialState: {
        entity: {},
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
      },
      reducers: this.reducers,
      extraReducers,
    });
  }
}

export default Base_Slice;
