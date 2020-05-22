import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {
    fetchUserById,
} from './userListSlice';

export function UserList() {
    // const count = useSelector(selectCount);
    useSelector((state) => {
        console.log(`state:\n${JSON.stringify(state, null, 2)}`);
        return state.users;
    });
    const dispatch = useDispatch();

    const fetchOneUser = async (userId) => {
        try {
            const resultAction = await dispatch(fetchUserById(userId));
            const user = unwrapResult(resultAction);
            // showToast('success', `Fetched ${user.name}`)
            console.log(`Fetched ${user.name}`);
            return user;
        } catch (err) {
            // showToast('error', `Fetch failed: ${err.message}`)
            console.error(`Fetch failed: ${err.message}`);
            return err;
        }
    };
    const userId = useSelector((state) => state.counter.value);
    const userList = useSelector((state) => state.userList.error);
    // const x = fetchOneUser(userId);
    // console.log(JSON.stringify(x, null, 2));
    return (
        <div>
            <h1>
                User List:
                {userId}
                <p>
                    userList:
                    {JSON.stringify(userList, null, 2)}
                </p>
            </h1>
        </div>
    );
}
