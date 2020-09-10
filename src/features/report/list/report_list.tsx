import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../style';
import { FilterComponent } from '../../../components/filter';
import { useSelector, useDispatch } from 'react-redux';
import { select_customer_id } from '../../customer/detail/customer_detail_slice'
import { select_reports, report_list_slice } from './report_list_slice';
import { Debug } from '../../../components/debug';
import { select_login_access_token } from '../../login/login_slice';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { report_api } from '../report_api';
export default function ReportList() {
    const customer_id = useSelector(select_customer_id);
    const access_token = useSelector(select_login_access_token);
    console.log('ReportList - customer_id: ' + customer_id);

    const {
        entity, loading, error,
        currentRequestId
    } = useSelector(select_reports);
    Use_Count_Renders('Report List');
    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        const handle_report_list = async () => {
            if (location.pathname === '/report') {
                dispatch(report_list_slice.fetch_all({ customer_id, access_token }));
            } else {
                if (customer_id === undefined) return;
                dispatch(report_list_slice.fetch_by_customer_id({ customer_id, access_token }));
            }
        }
        handle_report_list();
    },[customer_id, location]);

    const columns = [
        {
            name: 'Report',
            selector: 'name',
            sortable: true,
            cell: (row: any) => (
                <Link to={`/report/${row.id}`}>{row.name}</Link>
            ),
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            width: '100px',
        },
        {
            name: 'url',
            selector: 'url',
            sortable: true,
            cell: (row: any) => (
                <Link to={`/dash/${row.url}`}>/dash/{row.url}</Link>
            ),
        },
        {
            name: 'access key',
            selector: 'password',
            sortable: true,
        },
        {
            name: 'tags',
            selector: 'url',
            sortable: true,
            cell: (row: any) =>
                row.tag_desc_list.map((tag_desc: string) => <><span key={tag_desc} className="badge badge-secondary">{tag_desc}</span><br /> </>)
            ,
        },
        {
            name: 'created at',
            selector: 'created_at',
            sortable: true,
        },
        {
            name: 'updated at',
            selector: 'updated_at',
            sortable: true,
        }
    ];

    const [filter_text, set_filter_text] = React.useState('');
    const [reset_pagination_toggle, set_reset_pagination_toggle] = React.useState(false);
    const filtered_items = entity?.report_list?.filter((item: any) => item.name && item.name.toLowerCase().includes(filter_text.toLowerCase()));

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
        const id_list: number[] = selected_row_list.map((row: any) => row.id);
        // for (let row of selected_row_list) {
        //     console.log('deleting: ' + row.id)
        // }
        dispatch(report_list_slice.delete({id_list, access_token}));
    }
    return (
        <div>
            {/* <Debug entity={entity}
                error={error}
                loading={loading}
                currentRequestId={currentRequestId} /> */}
            <div>
                <h4 className="card-title">Reports</h4>
                <div style={{ height: '100%' }}>
                    <DataTable
                        columns={columns}
                        striped
                        noHeader
                        data={filtered_items}
                        progressPending={!loading}
                        customStyles={customStyles}
                        dense={false}
                        subHeader
                        subHeaderComponent={sub_header_component_memo}
                        selectableRows={true}
                        fixedHeader={true}
                        highlightOnHover={true}
                        overflowY={true}
                        keyField={'password'}
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
        </div >
    )
}
