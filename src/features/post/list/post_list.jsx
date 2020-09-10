import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { select_posts, post_list_slice } from './post_list_slice.ts';
import { customStyles } from '../../style';

export function Post_List() {
  const user_id = useSelector(select_user_id);

  const {
    entity_list, loading,
  } = useSelector(select_posts);

  const dispatch = useDispatch();

  // https://www.youtube.com/watch?v=-Ls48dd-vJE
  const handle_post_list = useCallback(async () => {
    if (user_id === undefined) return;
    await dispatch(post_list_slice.async_thunk(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    handle_post_list();
  }, [user_id, handle_post_list]);

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '50px',
      cell: (row) => (
        <b>
          {row.id}
        </b>
      ),
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      cell: (row) => (
        <Link to={`/post/${row.id}`}>{row.title}</Link>
      ),
    }];

  return (
    <DataTable
      columns={columns}
      data={entity_list}
      striped
      progressPending={!loading}
      customStyles={customStyles}
      title="Posts"
    />
  );
}
