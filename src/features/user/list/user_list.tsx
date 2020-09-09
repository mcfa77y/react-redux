// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { user_list_slice, select_user_list } from './user_list_slice';
import { customStyles } from '../../style';
import Debug from '../../../components/debug';

export function UserList() {
  const {
    response, loading, currentRequestId, error,
  } = useSelector(select_user_list);

  const dispatch = useDispatch();
  const handleUserList = async () => {
    try {
      console.log('fetchUserList');
      dispatch(user_list_slice.fetch_all({}));
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleUserList();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '50px',
      cell: (row: any) => (
        <b>
          {row.id}
        </b>
      ),
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row: any) => (
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
    <div>
      {/* <Debug 
        title="user list"
        response={response}
        loading={loading}
        currentRequestId={currentRequestId}
        error={error} /> */}
      <DataTable
        columns={columns}
        data={response}
        striped={striped}
        progressPending={!loading}
        customStyles={customStyles}
        dense={striped}
        title="Users"
      />
    </div>
  );
}
