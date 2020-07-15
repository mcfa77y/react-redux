// import { } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post_List } from '../../post/list/post_list';
import { Album_List } from '../../album/list/album_list';
// import { fetchUserById, selectUsers } from '../user_list/user_list_slice';
import { fetch_user_by_id, selectUser } from './user_detail_slice';

export function User_Detail({ match }) {
  const user_id = parseInt(match.params.id, 10);
  const {
    entity, loading, currentRequestId, error,
  } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleFetchUser = () => {
    try {
      // console.log(`fetchOneUser - user_id: ${userId}`);
      dispatch(fetch_user_by_id(user_id));
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  let e_unit = (
    <div>
      loading
    </div>
  );

  if (entity !== undefined && entity.id !== undefined) {
    e_unit = (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Username</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        <tbody>
          <tr key={entity.id}>
            <th scope="row">{entity.id}</th>
            <td>{entity.name}</td>
            <td>{entity.email}</td>
            <td>{entity.username}</td>
            <td>{entity.phone}</td>
            <td>{entity.website}</td>
          </tr>
        </tbody>
      </table>

    );
  }

  return (
    <div>
      <h3>
        User
      </h3>
      {e_unit}
      <hr />
      <div className="row">
        <div className="col">
          <h4>
            Albums
          </h4>
        </div>
        <div className="col">
          <h4>
          Posts
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col">

          <Album_List />
        </div>
        <div className="col">
          <Post_List />

        </div>
      </div>

    </div>

  );
}
