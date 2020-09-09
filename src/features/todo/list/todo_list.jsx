// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { todo_list_slice, select_todo_list } from './todo_list_slice.ts';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { customStyles } from '../../style';

export function Todo_List() {
  const user_id = useSelector(select_user_id);
  const {
    response, loading,
  } = useSelector(select_todo_list);
  const dispatch = useDispatch();
  const handleTodoList = async () => {
    try {
      if (user_id === undefined) return;
      console.log('fetchTodoList - :');
      await dispatch(todo_list_slice.fetch_by_user_id(user_id));
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleTodoList();
  }, [user_id]);

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
      cell: ({ completed, title }) => (completed
        ? (
          <s>
            {title}
          </s>
        )
        : (
          <div>
            {title}
          </div>
        )),
    },
  ];

  const striped = true;

  return (
    <DataTable
      title="Todos"
      columns={columns}
      data={response}
      striped={striped}
      progressPending={!loading}
      customStyles={customStyles}
      dense={striped}
    />
  );
}
