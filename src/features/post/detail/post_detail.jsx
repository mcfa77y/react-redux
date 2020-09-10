// import { } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment_List } from '../../comment/list/comment_list';
// import { fetchPostById, selectPosts } from '../post_list/post_list_slice';
import { select_post, post_detail_slice } from './post_detail_slice';

export function Post_Detail({ match }) {
  const post_id = parseInt(match.params.id, 10);
  const {
    entity
  } = useSelector(select_post);

  const dispatch = useDispatch();

  const handleFetchPost = () => {
    if (post_id === undefined) {
      return;
    }
    try {
      console.log(`fetchOnePost - post_id: ${post_id}`);
      dispatch(post_detail_slice.async_thunk(post_id));
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleFetchPost();
  }, []);

  let e_unit = (
    <div>
      loading
    </div>
  );

  if (entity !== undefined && entity.id !== undefined) {
    e_unit = (
      <div className="jumbotron">
        <h1 className="display-4">{entity.title}</h1>
        <hr className="my-4" />
        <p>{entity.body}</p>
      </div>
    );
  }

  return (
    <div>
      {e_unit}
      <Comment_List />
    </div>
  );
}
