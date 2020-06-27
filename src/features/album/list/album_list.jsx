// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { album_list_slice } from './album_list_slice';

export function Album_List() {
  const user_id = useSelector((state) => state.user.entity.id);

  const {
    entity_list, loading, currentRequestId, error,
  } = useSelector((state) => state.album_list);

  const dispatch = useDispatch();
  const handle_album_list = async () => {
    try {
      if (user_id === undefined) return;
      console.log(`fetchAlbumList - user_id:${user_id}`);
      await dispatch(album_list_slice.async_thunk(user_id));
      console.log(`xx comment entity list size: ${entity_list.length} user_id:${user_id}`);
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_album_list();
  }, [user_id]);

  let e_list = (
    <tr key={99}>
      <th scope="row">{99}</th>
      <td>no body</td>
    </tr>
  );
  if (entity_list.length > 0) {
    e_list = entity_list.map((e) => (
      <tr key={e.id}>
        <th scope="row">{e.id}</th>
        <td>
          <Link to={`/album/${e.id}`}>{e.title}</Link>
        </td>
      </tr>
    ));
  }

  console.log(`comment entity list size: ${entity_list.length} post_id:${user_id}`);
  return (
    <div>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
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
            album loading:
      {loading}
      <br />
            album currentRequestId:
      {currentRequestId}
      <br />
            album error:
      {error}
    </div>
  );
}
