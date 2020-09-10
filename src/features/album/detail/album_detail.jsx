// import { } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Photo_List } from '../../photo/list/photo_list';

const { select_album, album_detail_slice } = require('./album_detail_slice.ts');

export function Album_Detail({ match }) {
  const album_id = parseInt(match.params.id, 10);
  const {
    entity,
  } = useSelector(select_album);

  const dispatch = useDispatch();

  
  useEffect(() => {
    const handleFetchAlbum = async () => {
      try {
        if (album_id === undefined) return;
        console.log(`fetchAlbumList - album_id:${album_id}`);
        await dispatch(album_detail_slice.async_thunk(album_id));
      } catch (err) {
        console.error(`fetchAlbumList failed: ${err.message}`);
      }
    };
    handleFetchAlbum();
  }, [album_id, dispatch]);

  return (
    <div>
      <h3>
        Album:
        {entity.title}
      </h3>
      <Photo_List />
      <hr />

    </div>
  );
}
