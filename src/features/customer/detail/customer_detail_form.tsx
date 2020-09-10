import React, { useCallback } from 'react'
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { MyTextInput } from '../../../components/form/text_input';
import * as Yup from 'yup';
import { customer_detail_slice, select_customer_name, select_customer_id } from './customer_detail_slice';
import { select_login_access_token } from '../../login/login_slice';

export default function CustomerDetailForm() {
    const dispatch = useDispatch();
    const customer_name = useSelector(select_customer_name);
    const customer_id = useSelector(select_customer_id);
    const access_token = useSelector(select_login_access_token);
    const initialValues = { name: customer_name || '', id: customer_id || -1 };
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required'),
    });

    const handleSubmit = useCallback(async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        console.log('customer submit values' + JSON.stringify(values, null,2))
        const res = dispatch(customer_detail_slice.update({ data:values, access_token }))
        console.log('res: ' + JSON.stringify(res, null, 2));
    }, [dispatch]);
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <Form >
                    <div className="row">
                        <div className="col-md-3">

                            <MyTextInput
                                label="Name"
                                name="name"
                            />
                        </div>
                        <div className="col-md-3 mb-3 align-self-end">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
