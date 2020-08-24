import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import user_list_reduce from '../features/user/list/user_list_slice.ts';
import post_list_reducer from '../features/post/list/post_list_slice.ts';
import post_detail_reducer from '../features/post/detail/post_detail_slice.ts';
import comment_list_reducer from '../features/comment/list/comment_list_slice.ts';
import album_list_reducer from '../features/album/list/album_list_slice.ts';
import photo_list_reducer from '../features/photo/list/photo_list_slice.ts';
import todo_list_reducer from '../features/todo/list/todo_list_slice.ts';
import user_detail_reducer from '../features/user/detail/user_detail_slice.ts';

// const { album_detail_slice } = require('../features/album/detail/album_detail_slice.ts');
import album_detail_reducer from '../features/album/detail/album_detail_slice.ts';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user_list: user_list_reduce,
    user_detail: user_detail_reducer,
    post_detail: post_detail_reducer,
    album_list: album_list_reducer,
    // album_detail: album_detail_slice.detail_slice().reducer,
    album_detail: album_detail_reducer,
    photo_list: photo_list_reducer,
    post_list: post_list_reducer,
    comment_list: comment_list_reducer,
    todo_list: todo_list_reducer,
  },
});
