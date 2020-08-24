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
    entity_list, loading,
  } = useSelector(select_todo_list);
  const dispatch = useDispatch();
  const handleTodoList = async () => {
    try {
      if (user_id === undefined) return;
      console.log('fetchTodoList - :');
      await dispatch(todo_list_slice.async_thunk(user_id));
    } catch (err) {
      console.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    handleTodoList();
  }, [user_id]);

  let e_list = (
    <tr key={99}>
      <th scope="row">{99}</th>
      <td>no body</td>
      <td>no@body.com</td>
    </tr>
  );
  if (entity_list.length > 0) {
    console.log(JSON.stringify(entity_list, null, 1));
    e_list = entity_list.map(({ id, title, completed }) => (
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>
          {String(completed)}
        </td>
        <td>
          {title}
        </td>
      </tr>
    ));
  }

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
      data={entity_list}
      striped={striped}
      progressPending={!loading}
      customStyles={customStyles}
      dense={striped}
    />
  );
}
