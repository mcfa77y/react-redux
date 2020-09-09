// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { customStyles } from '../../style';
import Debug from '../../../components/debug.tsx';

const { album_list_slice } = require('./album_list_slice.ts');

export function AlbumList() {
  const user_id = useSelector(select_user_id);
  const location = useLocation();
  const {
    response, loading, currentRequestId, error,
  } = useSelector((state) => state.album_list);

  const dispatch = useDispatch();
  const handle_album_list = async () => {
    if (location.pathname === '/album') {
      await dispatch(album_list_slice.fetch_all({}));
    } else {
      if (user_id === undefined) return;
      await dispatch(album_list_slice.fetch_by_user_id(user_id));
    }
  };

  useEffect(() => {
    handle_album_list();
  }, [user_id, location]);

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

    <div>
      {/* <Debug
        title="album list"
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
        title="Albums"
      />
    </div>
  );
}
