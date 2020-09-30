import React, { useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Debug } from '../../../components/debug';
import { FilterComponent } from '../../../components/filter';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { select_login_access_token } from '../../login/login_slice';
import { customStyles } from '../../style';
import { report_list_slice, select_reports } from './report_list_slice';
type ReportListProps = {
    customer_id?: number
}
const columns = [
    {
        name: '#',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Report',
        selector: 'name',
        sortable: true,
        cell: (row: any) => (
            <Link key={row.id + "_name"} to={`/report/${row.id}`}>{row.name}</Link>
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
            <Link key={row.id + "_url"} to={`/dash/${row.url}`}>/dash/{row.url}</Link>
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
            row.tag_desc_list.map((tag_desc: string) => (
                <>
                    <span key={tag_desc} className="badge badge-secondary">
                        {tag_desc}
                    </span>
                    <br />
                </>))
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

const ReportList = React.memo(({ customer_id = -1 }: ReportListProps) => {
    Use_Count_Renders('Report List- customer_id:' + customer_id);

    // customer_id = customer_id === -1 ? useSelector(select_customer_id) : -1;
    const access_token = useSelector(select_login_access_token);

    const {
        entity, loading, error,
        currentRequestId
    } = useSelector(select_reports);
    const dispatch = useDispatch();

    const location = useLocation();

    const prev_customer_id = useRef(-1);
    useEffect(() => {
        const handle_report_list = async () => {
            if (location.pathname === '/report') {
                console.log("loading report list w/o customer");

                dispatch(report_list_slice.fetch_all({ customer_id, access_token }));
            } else {
                if (customer_id === undefined || customer_id === prev_customer_id.current) return;
                console.log("LOADING report list w customer: " + customer_id);
                const x = await dispatch(report_list_slice.fetch_by_customer_id({ customer_id, access_token }));
                console.log(`x: ${JSON.stringify(x, null, 2)}`);
                console.log("/LOADING report list w customer: " + customer_id);
            }
            prev_customer_id.current = customer_id;
        }
        handle_report_list();
    }, [customer_id, location]);



    const [filter_text, set_filter_text] = React.useState('');
    const [reset_pagination_toggle, set_reset_pagination_toggle] = React.useState(false);

    let filtered_items;
    if (loading === 'pending' || entity?.report_list === undefined) {
        filtered_items = [];
    }
    else {
        filtered_items = entity?.report_list?.filter((item: any) => Object
            .keys(item)
            .some(attr => item[attr] && item[attr].toLowerCase && item[attr].toLowerCase().includes(filter_text.toLowerCase())
            )
        );
    }
    console.log(`filtered_items: ${JSON.stringify(filtered_items, null, 2)}`);

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
        dispatch(report_list_slice.delete({ id_list, access_token }));
    }

    return (
        <div>
            <Debug entity={entity}
                error={error}
                loading={loading}
                currentRequestId={currentRequestId} />
            <div>
                <h4 className="card-title">Reports</h4>
                <div style={{ height: '100%' }}>
                    <DataTable
                        columns={columns}
                        striped
                        noHeader
                        data={filtered_items}
                        progressPending={(loading === 'pending')}
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
        </div >
    )
});

export default ReportList;
