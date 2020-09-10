import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import user_list_reduce from '../features/user/list/user_list_slice.ts';
import post_list_reducer from '../features/post/list/post_list_slice.ts';
import post_detail_reducer from '../features/post/detail/post_detail_slice.ts';
import comment_list_reducer from '../features/comment/list/comment_list_slice.ts';
import album_list_reducer from '../features/album/list/album_list_slice.ts';
import customer_list_reducer from '../features/customer/list/customer_list_slice.ts';
import report_list_reducer from '../features/report/list/report_list_slice.ts';
import report_detail_reducer from '../features/report/detail/report_detail_slice.ts';
import customer_detail_reducer from '../features/customer/detail/customer_detail_slice.ts';
import photo_list_reducer from '../features/photo/list/photo_list_slice.ts';
import todo_list_reducer from '../features/todo/list/todo_list_slice.ts';
import user_detail_reducer from '../features/user/detail/user_detail_slice.ts';
import login_reducer from '../features/login/login_slice.ts';

// const { album_detail_slice } = require('../features/album/detail/album_detail_slice.ts');
import album_detail_reducer from '../features/album/detail/album_detail_slice.ts';

const save_to_local_storage = (state) => {
  try {
    const serialized_state = JSON.stringify(state.getState());
    localStorage.setItem('state', serialized_state);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

const load_from_local_storage = () => {
  try {
    const serialized_state = localStorage.getItem('state');
    if (serialized_state === null) return undefined;
    return JSON.parse(serialized_state);
  } catch (error) {
    console.log(`error: ${error}`);
    return undefined;
  }
};

const preloadedState = load_from_local_storage();

const x = configureStore({
  preloadedState,
  reducer: {
    counter: counterReducer,
    // album_detail: album_detail_slice.detail_slice().reducer,
    album_detail: album_detail_reducer,
    album_list: album_list_reducer,
    comment_list: comment_list_reducer,
    customer_detail: customer_detail_reducer,
    customer_list: customer_list_reducer,
    login: login_reducer,
    photo_list: photo_list_reducer,
    post_detail: post_detail_reducer,
    post_list: post_list_reducer,
    report_detail: report_detail_reducer,
    report_list: report_list_reducer,
    todo_list: todo_list_reducer,
    user_detail: user_detail_reducer,
    user_list: user_list_reduce,
  },
});
x.subscribe(() => save_to_local_storage(x));
export default x;
