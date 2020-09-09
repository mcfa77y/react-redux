/* eslint-disable class-methods-use-this */
import { createSlice, Slice } from '@reduxjs/toolkit';
type State = {
  response: any;
  loading: string;
  currentRequestId: undefined;
  error: null;
}

abstract class Base_Slice {
  entity_name: string;
  base_entity_name: string;
  async_thunk: any;
  async_thunk_list: any[] = [];

  constructor(entity_name: string) {
    console.log(`Base slice: ${entity_name}`);
    this.entity_name = `${entity_name}`;
    this.base_entity_name = entity_name;
  }

  slice(): Slice<State, any, string> {

    const extraReducers = this.async_thunk_list.reduce((acc, async_thunk) => {
      const x = {
        [async_thunk.pending]: (state: State, action: any) => {
          if (state.loading === 'idle') {
            state.loading = 'pending';
            state.currentRequestId = action.meta.requestId;
          }
        },
        [async_thunk.fulfilled]: (state: State, action: any) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
            state.response = action.payload;
            state.currentRequestId = undefined;
          }
        },
        [async_thunk.rejected]: (state: State, action: any) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
            state.error = action.error;
            state.currentRequestId = undefined;
          }
        },
      }
      return acc = { ...acc, ...x };
    }, {})

    return createSlice({
      name: `${this.entity_name}`,
      initialState: {
        response: [],
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
      },
      reducers: {},
      extraReducers
    });
  }
}

export default Base_Slice;
