import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from './userListSlice';


export function UserList() {
    const userId = useSelector((state) => state.counter.value);
    useSelector((state) => {
        console.log(`use selector - state:\n${JSON.stringify(state, null, 2)}`);
        return state.users;
    });
    const dispatch = useDispatch();

    const fetchOneUser = async (user_id) => {
        try {
            console.log(`fetchOneUser - user_id: ${user_id}`);
            const resultAction = await dispatch(fetchUserById(user_id));
            const user = unwrapResult(resultAction);
            // showToast('success', `Fetched ${user.name}`)
            console.log(`Fetched ${user}`);

            // return user;
        } catch (err) {
            // showToast('error', `Fetch failed: ${err.message}`)
            console.error(`Fetch failed: ${err.message}`);
            // return err;
        }
    };

    const onClick = () => {
        dispatch(fetchOneUser(userId)).then((resp) => {
            console.log(resp);
        });
    };
    //   return await fetchOneUser(userId);
    // useEffect(fetchOneUser(userId), userId);
    return (
        <div>
            hi
            <button type="button" onClick={onClick}>sub</button>
        </div>
    );
}
