// import {  } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { todo_list_slice, select_todo_list } from './todo_list_slice.ts';
import { select_user_id } from '../../user/detail/user_detail_slice.ts';
import { customStyles } from '../../style';
import { FilterComponent } from '../../../components/filter.tsx';

export function Todo_List() {
  const user_id = useSelector(select_user_id);
  const {
    entity_list, loading,
  } = useSelector(select_todo_list);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleTodoList = async () => {
      try {
        if (user_id === undefined) return;
        console.log('fetchTodoList - :');
        await dispatch(todo_list_slice.async_thunk(user_id));
      } catch (err) {
        console.error(`Fetch failed: ${err.message}`);
      }
    };
    handleTodoList();
  }, [user_id, dispatch]);

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
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = entity_list
    .filter((item) => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Todos"
      columns={columns}
      data={filteredItems}
      striped={striped}
      progressPending={!loading}
      customStyles={customStyles}
      dense={striped}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
}
