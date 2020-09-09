// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comment_list_slice, select_comments } from './comment_list_slice.ts';
import { select_post_id } from '../../post/detail/post_detail_slice.ts';
import Debug from '../../../components/debug.tsx';

export function Comment_List() {
  const post_id = useSelector(select_post_id);

  const {
    response, loading, currentRequestId, error,
  } = useSelector(select_comments);

  const dispatch = useDispatch();
  const handle_comment_list = async () => {
    try {
      if (post_id === undefined) return;
      console.log(`fetchCommentList - user_id:${post_id}`);
      await dispatch(comment_list_slice.fetch_by_post_id(post_id));
      console.log(`xx comment entity list size: ${response.length} user_id:${post_id}`);
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_comment_list();
  }, [post_id]);

  let e_list = (
    <div>loading comments</div>
  );
  if (response.length > 0) {
    e_list = response.map((e) => (
      <tr key={e.id}>
        <th scope="row">{e.id}</th>
        <td>
          {e.name}
        </td>
        <td>{e.body}</td>
        <td>{e.email}</td>
      </tr>
    ));
  }

  console.log(`comment entity list size: ${response.length} post_id:${post_id}`);
  return (
    <div>
      {/* <Debug
        title="post list"
        response={response}
        loading={loading}
        currentRequestId={currentRequestId}
        error={error}
      /> */}
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
    </div>
  );
}
