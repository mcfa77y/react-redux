// import {  } from '@reduxjs/toolkit';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { customStyles } from '../../style';

const { album_list_slice } = require('./album_list_slice.ts');

export function Album_List() {
  const user_id = useSelector(select_user_id);

  const {
    entity_list, loading
  } = useSelector((state) => state.album_list);

  const dispatch = useDispatch();
  const handle_album_list = useCallback(async () => {
    if (user_id === undefined) return;
    await dispatch(album_list_slice.async_thunk(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    handle_album_list();
  }, [handle_album_list, user_id]);

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
        <Link to={`/album/${row.id}`}>{row.title}</Link>
      ),
    },
  ];

  const striped = true;

  return (
    <DataTable
      columns={columns}
      data={entity_list}
      striped={striped}
      progressPending={!loading}
      customStyles={customStyles}
      dense={striped}
      pagination
      title="Albums"
    />
  );
}
