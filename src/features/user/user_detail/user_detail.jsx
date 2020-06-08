import { } from '@reduxjs/toolkit';
import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from './userListSlice';


export function User_Detail() {
    const userId = useSelector((state) => state.counter.value);
    const {
        entity, loading, currentRequestId,
    } = useSelector((state) => state.userList);

    const dispatch = useDispatch();

    const fetchOneUser = () => {
        try {
            // console.log(`fetchOneUser - user_id: ${userId}`);
            dispatch(fetchUserById(userId));
            // showToast('success', `Fetched ${user.name}`)
            // console.log(`Fetched resultAction: ${JSON.stringify(resultAction, null, 2)}`);
            // console.log(`Fetched ${JSON.stringify(user, null, 2)}`);

            // return user;
        } catch (err) {
            // showToast('error', `Fetch failed: ${err.message}`)
            console.error(`Fetch failed: ${err.message}`);
            // return err;
        }
    };

    const e_unit = (
        <tr key={entity.id}>
            <th scope="row">{entity.id}</th>
            <td>{entity.name}</td>
            <td>{entity.email}</td>
            <td>{entity.username}</td>
        </tr>
    );

    return (
        <div>
            <button type="button" onClick={fetchOneUser} className="btn btn-primary">Get user</button>
            <br />
            <div className="row">
                <div className="col">
                    <h2>
                        Entity:
                    </h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {e_unit}
                        </tbody>
                    </table>
                </div>
            </div>

            <br />

            <br />
            loading:
            {loading}
            <br />
            currentRequestId:
            {currentRequestId}
        </div>
    );
}
