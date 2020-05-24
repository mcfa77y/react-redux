import { unwrapResult } from '@reduxjs/toolkit';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from './userListSlice';


export function UserList() {
  // const count = useSelector(selectCount);
  useSelector((state) => {
    console.log(`use selector - state:\n${JSON.stringify(state, null, 2)}`);
    return state.users;
  });
  const dispatch = useDispatch();

  const fetchOneUser = async (userId) => {
    try {
      const resultAction = await dispatch(fetchUserById(userId));
      const user = unwrapResult(resultAction);
      // showToast('success', `Fetched ${user.name}`)
      console.log(`Fetched ${user}`);
      return (
        <div>
          <h1>
            User:
                        {user}
          </h1>

        </div>
      );
      // return user;
    } catch (err) {
      // showToast('error', `Fetch failed: ${err.message}`)
      console.error(`Fetch failed: ${err.message}`);
      // return err;
      return (
        <div>
          <h1>
            Error:
                        {err}
          </h1>

        </div>
      );
    }
  };
  const userId = useSelector((state) => state.counter.value);
  return await fetchOneUser(userId);

}
