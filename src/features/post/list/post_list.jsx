// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetch_post_list_by_user_id, select_posts } from './post_list_slice';

export function Post_List() {
  const user_id = useSelector((state) => state.user.entity.id);

  const {
    entity_list, loading, currentRequestId, error,
  } = useSelector(select_posts);

  const dispatch = useDispatch();
  const handle_post_list = async () => {
    try {
      if (user_id === undefined) return;
      console.log(`fetchPostList - user_id:${user_id}`);
      await dispatch(fetch_post_list_by_user_id(user_id));
      console.log(`xx post entity list size: ${entity_list.length} user_id:${user_id}`);
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handle_post_list();
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
          <Link to={`/post/${e.id}`}>{e.title}</Link>
        </td>
      </tr>
    ));
  }

  console.log(`post entity list size: ${entity_list.length} user_id:${user_id}`);
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
            post loading:
      {loading}
      <br />
            post currentRequestId:
      {currentRequestId}
      <br />
            post error:
      {error}
    </div>
  );
}
