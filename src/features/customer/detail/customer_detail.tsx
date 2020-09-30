import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { select_login_access_token } from '../../login/login_slice';
import ReportList from '../../report/list/report_list';
import CustomerDetailForm from './customer_detail_form';
import { select_customer_name } from './customer_detail_slice';

const { select_customer, customer_detail_slice } = require('./customer_detail_slice.ts');

export function Customer_Detail({ match }: { match: any }) {
  const customer_id = parseInt(match.params.id, 10);
  // const {
  //   entity, loading, currentRequestId, error,
  // } = useSelector(select_customer);

  const customer_name = useSelector(select_customer_name);
  const access_token = useSelector(select_login_access_token);

  Use_Count_Renders(`Customer Detail - name:${customer_name}`);
  const dispatch = useDispatch();


  useEffect(() => {
    const handle_fetch_customer = async () => {
      try {
        if (customer_id === undefined) return;
        console.log(`fetch_customer_detail - customer_id:${customer_id}`);
        dispatch(customer_detail_slice.fetch_by_id({ entity_id: customer_id, access_token }));
      } catch (err) {
        console.error(`fetch_customer_detail failed: ${err.message}`);
      }
    };

    handle_fetch_customer();
  }, []);




  return (
    <div key="customer-component">
      <h3>
        Customer:
        {customer_name}
      </h3>

      <div key='customer-card' className="card">
        <div key='customer-card-body' className="card-body">
          <CustomerDetailForm
            customer_id={customer_id}
            customer_name={customer_name} />
          <ReportList
            customer_id={customer_id} />
          {/* <Debug entity={entity}
            error={error}
            loading={loading}
            currentRequestId={currentRequestId} /> */}
        </div>
      </div>
    </div>

  );
}
