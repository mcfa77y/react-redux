import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userListReducer from '../features/userList/userListSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    userList: userListReducer
  },
});
