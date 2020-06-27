import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import user_list_reduce from '../features/user/list/user_list_slice';
import post_list_reducer from '../features/post/list/post_list_slice';
import post_detail_reducer from '../features/post/detail/post_detail_slice';
import comment_list_reducer from '../features/comment/list/comment_list_slice';
import album_list_reducer from '../features/album/list/album_list_slice';
import user_detail_reducer from '../features/user/detail/user_detail_slice';
// import comment_detail_reducer from '../features/comment/detail/comment_detail_slice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user_list: user_list_reduce,
    user: user_detail_reducer,
    post: post_detail_reducer,
    album_list: album_list_reducer,
    post_list: post_list_reducer,
    comment_list: comment_list_reducer,
  },
});
