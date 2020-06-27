// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetch_comment_list_by_post_id, select_comments } from './comment_list_slice';

export function Comment_List() {
  const post_id = useSelector((state) => state.post.entity.id);

  const {
    entity_list, loading, currentRequestId, error,
  } = useSelector(select_comments);

  const dispatch = useDispatch();
  const handle_comment_list = async () => {
    try {
      if (post_id === undefined) return;
      console.log(`fetchCommentList - user_id:${post_id}`);
      await dispatch(fetch_comment_list_by_post_id(post_id));
      console.log(`xx comment entity list size: ${entity_list.length} user_id:${post_id}`);
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_comment_list();
  }, [post_id]);

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
          <Link to={`/comment/${e.id}`}>{e.name}</Link>
        </td>
        <td>{e.body}</td>
        <td>{e.email}</td>
      </tr>
    ));
  }

  console.log(`comment entity list size: ${entity_list.length} post_id:${post_id}`);
  return (
    <div>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">body</th>
                <th scope="col">email</th>
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
            comment loading:
      {loading}
      <br />
            comment currentRequestId:
      {currentRequestId}
      <br />
            comment error:
      {error}
    </div>
  );
}
