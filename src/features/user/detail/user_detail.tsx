// import { } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
} from 'react-router-dom';
import { Post_List } from '../../post/list/post_list';
import { AlbumList } from '../../album/list/album_list';
import { Todo_List } from '../../todo/list/todo_list';
import Debug from '../../../components/debug';

const { select_user, user_detail_slice } = require('./user_detail_slice.ts');

export function UserDetail({ match }: { match: any }) {
  const user_id = parseInt(match.params.id, 10);
  const entity: any = useSelector(select_user);

  const dispatch = useDispatch();

  const handleFetchUser = () => {
    try {
      // console.log(`fetchOneUser - user_id: ${userId}`);
      dispatch(user_detail_slice.fetch_by_id(user_id));
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
      {/* <Debug 
        title="user detail"
        response={entity}
        loading={loading}
        currentRequestId={currentRequestId}
        error={error} /> */}
      {e_unit}
      <hr />
      <div className="row">
        <div className="col">
          <AlbumList />
        </div>
        <div className="col">
          <Post_List />
        </div>
        <div className="col">
          <Todo_List />
        </div>
      </div>

    </div>

  );
}
