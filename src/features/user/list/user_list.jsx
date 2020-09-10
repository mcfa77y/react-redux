// import {  } from '@reduxjs/toolkit';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { user_list_slice, select_user_list } from './user_list_slice.ts';
import { customStyles } from '../../style';

export function UserList() {
  const {
    entity_list, loading
  } = useSelector(select_user_list);

  const dispatch = useDispatch();
  const handleUserList = useCallback(async () => {
    try {
      console.log('fetchUserList - :');
      await dispatch(user_list_slice.async_thunk());
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  }, [dispatch]);

  useEffect(() => {
    handleUserList();
  }, [handleUserList]);

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
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row) => (
        <Link to={`/user/${row.id}`}>{row.name}</Link>
      ),
    },
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true,
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
      title="Users"
    />
  );
}
