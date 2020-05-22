import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectCount,
// } from './UserListSlice';

export function UserList() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <h1>User List:</h1>
    </div>
  );
}
