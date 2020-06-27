// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserList, selectUsers } from './user_list_slice';

export function UserList() {
  const {
    entity_list, loading, currentRequestId, error,
  } = useSelector(selectUsers);

  const dispatch = useDispatch();
  const handleUserList = async () => {
    try {
      console.log('fetchUserList - :');
      await dispatch(fetchUserList());
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleUserList();
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
          <Link to={`user/${e.id}`}>{e.name}</Link>
        </td>
        <td>{e.email}</td>
        <td>{e.username}</td>
      </tr>
    ));
  }


  return (
    <div>
      <div className="row">
        <div className="col">
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
      </div>

      <br />

      <br />
            loading:
      {loading}
      <br />
            currentRequestId:
      {currentRequestId}
      <br />
            error:
      {error}
    </div>
  );
}
