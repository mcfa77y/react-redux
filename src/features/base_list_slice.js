/* eslint-disable class-methods-use-this */
import { createSlice } from '@reduxjs/toolkit';

class Base_List_Slice {
  constructor(entity_name) {
    console.log(`Base list slice: ${entity_name}`);

    this.entity_name = `${entity_name}_list`;
    this.base_entity_name = entity_name;
    this.async_thunk = this.async_thunk_fn();
  }

  async_thunk_fn() {
    throw new Error('You have to implement the method doSomething!');
  }

  list_slice() {
    return createSlice({
      name: `${this.entity_name}`,
      initialState: {
        entity_list: [],
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
      },
      reducers: {},
      extraReducers: {
        [this.async_thunk.pending]: (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending';
            state.currentRequestId = action.meta.requestId;
          }
        },
        [this.async_thunk.fulfilled]: (state, action) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
            state.entity_list = action.payload;
            state.currentRequestId = undefined;
          }
        },
        [this.async_thunk.rejected]: (state, action) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
            state.error = action.error;
            state.currentRequestId = undefined;
          }
        },
      },
    });
  }

  select_entity_list(state) {
    console.log(`select_entity_list: ${this.entity_name}`);

    return state[`${this.entity_name}`];
  }
}

export default Base_List_Slice;
// export default list_slice.reducer;
