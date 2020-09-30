import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Debug } from '../../../components/debug';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { select_login_access_token } from '../../login/login_slice';
import ReportDetailForm from './report_detail_form';
import { report_detail_slice, select_report } from './report_detail_slice';
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
                <ReportDetailForm
                    entity={entity}
                />
            </div >
        </div >
    )
}
