// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { select_posts, post_list_slice } from './post_list_slice.ts';
import { customStyles } from '../../style';
import Debug from '../../../components/debug.tsx';

export function Post_List() {
  const user_id = useSelector(select_user_id);
  const location = useLocation();
  const {
    response, loading, currentRequestId, error,
  } = useSelector(select_posts);

  const dispatch = useDispatch();
  const handle_post_list = async () => {
    if (location.pathname === '/post') {
      await dispatch(post_list_slice.fetch_all({}));
    } else {
      if (user_id === undefined) return;
      await dispatch(post_list_slice.fetch_by_user_id(user_id));
    }
  };

  useEffect(() => {
    handle_post_list();
  }, [location, user_id]);

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '60px',
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

  const striped = true;

  return (
    <div>
      {/* <Debug
          title="post list"
          response={response}
          loading={loading}
          currentRequestId={currentRequestId}
          error={error}
        /> */}
      <DataTable
        columns={columns}
        data={response}
        striped={striped}
        progressPending={!loading}
        customStyles={customStyles}
        dense={striped}
        title="Posts"
      />
    </div>
  );
}
