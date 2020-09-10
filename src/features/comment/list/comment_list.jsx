// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comment_list_slice, select_comments } from './comment_list_slice.ts';
import { select_post_id } from '../../post/detail/post_detail_slice.ts';

export function Comment_List() {
  const post_id = useSelector(select_post_id);

  const {
    entity_list
  } = useSelector(select_comments);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const handle_comment_list = async () => {
      try {
        if (post_id === undefined) return;
        console.log(`fetchCommentList - user_id:${post_id}`);
        await dispatch(comment_list_slice.async_thunk(post_id));
        console.log(`xx comment entity list size: ${entity_list.length} user_id:${post_id}`);
      } catch (err) {
        console.error(`Fetch failed: ${err.message}`);
      }
    };
    handle_comment_list();
  }, [post_id, dispatch, entity_list]);

  let e_list = (
    <div>loading comments</div>
  );
  if (entity_list.length > 0) {
    e_list = entity_list.map((e) => (
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
    </div>
  );
}
