// import {  } from '@reduxjs/toolkit';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { customer_list_slice, select_customer_list } from './customer_list_slice';
import { customStyles } from '../../style';
import { select_login_access_token } from '../../login/login_slice';
import { FilterComponent } from '../../../components/filter';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
// import { Use_Count_Renders } from '../../../utils/use_count_renders';

export function Customer_List() {
  const { entity_list, loading } = useSelector(select_customer_list);

  const access_token = useSelector(select_login_access_token);
  Use_Count_Renders('Customer List');
  const dispatch = useDispatch();

  const handle_customer_list = useCallback(
    async () => {
      try {
        if (access_token === undefined) {
          window.location.href = '/';
          return;
        }
        console.log('fetch_customer_list - :');
        await dispatch(customer_list_slice.async_thunk(access_token));
      } catch (err) {
        console.error(`Fetch failed: ${err.message}`);
      }
    },
    [dispatch, access_token],
  )
  useEffect(() => {
    handle_customer_list();
  }, [handle_customer_list]);

  const columns = [
    {
      name: 'Customer',
      selector: 'name',
      sortable: true,
      cell: (row: any) => (
        <Link to={`/customer/${row.id}`}>{row.name}</Link>
      ),
    },
    {
      name: 'Report Count',
      selector: 'report_count',
      sortable: true,
    },
    {
      name: 'Created at',
      selector: 'created_at',
      sortable: true,
    },
    {
      name: 'Updated at',
      selector: 'updated_at',
      sortable: true,
    },
  ];


  const [filter_text, set_filter_text] = React.useState('');
  const [reset_pagination_toggle, set_reset_pagination_toggle] = React.useState(false);
  const filtered_items = entity_list?.customer_list?.filter((item: any) => item.name && item.name.toLowerCase().includes(filter_text.toLowerCase()));

  const sub_header_component_memo = React.useMemo(() => {
    const handleClear = () => {
      if (filter_text) {
        set_reset_pagination_toggle(!reset_pagination_toggle);
        set_filter_text('');
      }
    };

    const handle_filter = (e: any) => {
      set_filter_text(e.target.value)
    }

    return <FilterComponent
      onFilter={handle_filter}
      onClear={handleClear}
      filterText={filter_text}
      placeholder='Search' />;

  }, [filter_text, reset_pagination_toggle]);

  const [selected_row_list, set_selected_row_list] = React.useState<any>([]);
  const [is_disable_delete, set_is_disable_delete] = React.useState(true);
  const handle_selected_rows_change = (state: any) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    const { selectedRows } = state;
    console.log('Selected Rows: ', selectedRows);
    set_selected_row_list(selectedRows);
    if (selectedRows.length > 0) {
      set_is_disable_delete(false)
    } else {
      set_is_disable_delete(true)
    }
  };

  const handle_delete_click = (e: any) => {
    for (let row of selected_row_list) {
      console.log('deleting: ' + row.id)
    }
  }


  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Customers</h4>
        <div style={{ height: '100%' }}>

          <DataTable
            noHeader={true}
            columns={columns}
            data={filtered_items}
            striped={true}
            progressPending={!loading}
            customStyles={customStyles}
            dense={false}
            subHeader
            subHeaderComponent={sub_header_component_memo}
            selectableRows={true}
            fixedHeader={true}
            highlightOnHover={true}
            overflowY={true}
            onSelectedRowsChange={handle_selected_rows_change}
          />

        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-2">
          <button className="btn btn-danger m-3" disabled={is_disable_delete} onClick={handle_delete_click}>Delete</button>
        </div>
        <div className="col-2">
          <button className="btn btn-primary m-3">Add</button>
        </div>
      </div>
    </div>
  );
}
