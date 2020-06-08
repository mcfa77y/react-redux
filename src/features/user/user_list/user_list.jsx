// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, fetchUserList } from './user_list_slice';


export function UserList() {
    const userId = useSelector((state) => state.counter.value);
    const {
        entity, entity_list, loading, currentRequestId,
    } = useSelector((state) => state.userList);

    const dispatch = useDispatch();

    const fetchOneUser = () => {
        try {
            console.log(`fetchOneUser - user_id: ${userId}`);
            dispatch(fetchUserById(userId)).then((user) => {
                console.log(`Fetched ${JSON.stringify(user, null, 2)}`);
            });
            // showToast('success', `Fetched ${user.name}`)
            // console.log(`Fetched resultAction: ${JSON.stringify(resultAction, null, 2)}`);

            // return user;
        } catch (err) {
            // showToast('error', `Fetch failed: ${err.message}`)
            console.error(`Fetch failed: ${err.message}`);
            // return err;
        }
    };

    const fetchUserList_2 = async () => {
        try {
            console.log('fetchUserList - :');
            const resultAction = await dispatch(fetchUserList());
            // const user = unwrapResult(resultAction);
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

    useEffect(() => {
        fetchUserList_2();
    }, []);

    let e_list = (
        <tr key={99}>
            <th scope="row">{99}</th>
            <td>no body</td>
            <td>no@body.com</td>
            <td>none</td>
        </tr>
    );
    if (entity_list.length > 0) {
        e_list = entity_list.map((e) => (
            <tr key={e.id}>
                <th scope="row">{e.id}</th>
                <td>
                    <a href={`user/${e.id}`}>
                        {e.name}
                    </a>
                </td>
                <td>{e.email}</td>
                <td>{e.username}</td>
            </tr>
        ));
    }

    const e_unit = (
        <tr key={entity.id}>
            <th scope="row">{entity.id}</th>
            <td><a href="user/{id}">{entity.name}</a></td>
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
                    entity list:
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
                            {e_list}
                        </tbody>
                    </table>
                </div>
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
