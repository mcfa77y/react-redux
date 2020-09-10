import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../style';
import { FilterComponent } from '../../../components/filter';
import { useSelector, useDispatch } from 'react-redux';
import { select_customer_id } from '../../customer/detail/customer_detail_slice'
import { select_report, report_detail_slice } from './report_detail_slice';
import { Debug } from '../../../components/debug';
import { select_login_access_token } from '../../login/login_slice';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { report_api } from '../report_api';
import ReportDetailForm from './report_detail_form';
export default function ReportDetail({ match }: { match: any }) {
    const report_id = parseInt(match.params.id, 10);

    const access_token = useSelector(select_login_access_token);

    const {
        entity, loading, error,
        currentRequestId
    } = useSelector(select_report);
    Use_Count_Renders('Report Detail');
    const dispatch = useDispatch();
    useEffect(() => {
        const handle_report_list = async () => {
            if (report_id === undefined) return;
            dispatch(report_detail_slice.fetch_by_id({ report_id, access_token }));
        }
        handle_report_list();
    }, [report_id]);


    return (
        <div>
            <Debug entity={entity?.report?.name}
                error={error}
                loading={loading}
                currentRequestId={currentRequestId} />
            <div>
                <h4 className="card-title">Report: {entity?.report?.name}</h4>
                <ReportDetailForm />
            </div >
        </div >
    )
}
