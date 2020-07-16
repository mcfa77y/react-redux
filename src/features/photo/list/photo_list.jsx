// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { photo_list_slice } = require('./photo_list_slice.ts');

export function Photo_List() {
  const album_id = useSelector((state) => state.album_detail.entity.id);

  const {
    entity_list: photo_list,
  } = useSelector((state) => state.photo_list);

  const dispatch = useDispatch();
  const handle_photo_list = async () => {
    try {
      if (album_id === undefined) return;
      console.log(`fetchPhotoList - album_id:${album_id}`);
      await dispatch(photo_list_slice.async_thunk(album_id));
      console.log(`xx album entity list size: ${photo_list.length} album_id:${album_id}`);
    } catch (err) {
      console.error(`fetchPhotoList failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_photo_list();
  }, [album_id]);

  let e_list = (
    <div>
            loading photos
    </div>
  );

  if (photo_list.length > 0) {
    e_list = photo_list.map(({
      id, title, url, thumbnailUrl,
    }) => (
      <div className="col-sm-6 col-md-2">
        <div className="card" style={{ width: '10rem' }}>
          <a href={url}><img className="card-img-top" src={thumbnailUrl} alt={title} /></a>
          <div className="card-body">
            <h5 className="card-title">{id}</h5>
            <p className="card-text">{title}</p>
          </div>
        </div>
      </div>

    ));
  }

  return (
    <div className="row">
      {e_list}
    </div>
  );
}
