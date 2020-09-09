/* eslint-disable class-methods-use-this */
import { createSlice, AsyncThunk, Slice } from '@reduxjs/toolkit';
type State = {
  entity_list: never[];
  loading: string;
  currentRequestId: undefined;
  error: null;
}

class Base_List_Slice {
  entity_name: string;
  base_entity_name: string;
  async_thunk: any;
  async_thunk_list: any[] = [];
  // async_thunk: AsyncThunk<any, number, {}>;
  constructor(entity_name: string) {
    console.log(`Base list slice: ${entity_name}`);

    this.entity_name = `${entity_name}_list`;
    this.base_entity_name = entity_name;
    // this.async_thunk = this.async_thunk_fn();
    // this.async_thunk_list = [];
  }

  // async_thunk_fn(): AsyncThunk<any, number, {}> {
  //   throw new Error('You have to implement the method doSomething!');
  // }

  list_slice(): Slice<{
    entity_list: never[];
    loading: string;
    currentRequestId: undefined;
    error: null;
  }, {}, string> {

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
            state.entity_list = action.payload;
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
        entity_list: [],
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
      },
      reducers: {},
      extraReducers
    });
  }
}

export default Base_List_Slice;
// export default list_slice.reducer;
