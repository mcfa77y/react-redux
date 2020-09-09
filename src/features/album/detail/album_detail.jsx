// import { } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PhotoList } from '../../photo/list/photo_list';
import { user_detail_slice, select_user, select_user_id } from '../../user/detail/user_detail_slice';
import Debug from '../../../components/debug';
import { log_json } from '../../utils';

const { select_album, album_detail_slice } = require('./album_detail_slice.ts');

export function Album_Detail({ match }) {
  const album_id = parseInt(match.params.id, 10);

  const {
    response,
    loading,
    currentRequestId,
    error
  } = useSelector(select_album);

  const {
    response: user_entity,
    loading: user_loading,
    currentRequestId: user_currentRequestId,
    error: user_error
  } = useSelector(select_user);

  const dispatch = useDispatch();

  const handleFetchAlbum = async () => {
    if (album_id !== undefined) {
      console.log(`fetchAlbumList - album_id:${album_id}`);
      dispatch(album_detail_slice.fetch_by_id(album_id));
    }

  };
  useEffect(() => {
    handleFetchAlbum();
  }, [album_id]);

  const handleFetchUser = async () => {
    if (response.userId !== undefined) {
      console.log("fetching user info");
      const user = await dispatch(user_detail_slice.fetch_by_id(response.userId));
      console.log("fetching user info complete! " + JSON.stringify(user, null, 2));
      console.log('user_entity: ' + JSON.stringify(user_entity, null, 2));
      console.log('user_loading: ' + JSON.stringify(user_loading, null, 2));
      console.log('user_currentRequestId: ' + JSON.stringify(user_currentRequestId, null, 2));
      console.log('user_error: ' + JSON.stringify(user_error, null, 2));
    }
  }
  useEffect(() => {
    handleFetchUser();
  }, [response.userId]);

  return (
    <div>
      <Debug
        title="album detail"
        response={response}
        loading={loading}
        currentRequestId={currentRequestId}
        error={error} />
      <h3>
        Album:
        {response.title}
      </h3>
      <br />
        User: <Link to={`/user/${response.userId}`}>{user_entity?.name}</Link>
      <pre>{JSON.stringify(user_entity, null, 2)}</pre>
      <Debug
        title="user detail"
        response={user_entity}
        loading={user_loading}
        currentRequestId={user_currentRequestId}
        error={user_error} />
      <PhotoList />
      <hr />

    </div>
  );
}
