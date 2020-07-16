// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { select_user_id } from '../../user/detail/user_detail_slice';
import { select_posts, post_list_slice } from './post_list_slice';

export function Post_List() {
  const user_id = useSelector(select_user_id);

  const {
    entity_list, loading, currentRequestId, error,
  } = useSelector(select_posts);

  const dispatch = useDispatch();
  const handle_post_list = async () => {
    try {
      if (user_id === undefined) return;
      console.log(`fetchPostList - user_id:${user_id}`);
      await dispatch(post_list_slice.async_thunk(user_id));
      console.log(`xx post entity list size: ${entity_list.length} user_id:${user_id}`);
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_post_list();
  }, [user_id]);

  let e_list = (
    <div>loading posts</div>
  );
  if (entity_list.length > 0) {
    e_list = entity_list.map((e) => (
      <tr key={e.id}>
        <th scope="row">{e.id}</th>
        <td>
          <Link to={`/post/${e.id}`}>{e.title}</Link>
        </td>
      </tr>
    ));
  }

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
    </div>
  );
}
