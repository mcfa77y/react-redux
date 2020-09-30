import { Button, LinearProgress } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { MyTextInput } from '../../../components/form/text_input';
import * as Yup from 'yup';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
import { select_login_access_token } from '../../login/login_slice';
import { customer_detail_slice } from './customer_detail_slice';

type CustomerDetailFormProps = {
  customer_name: string,
  customer_id: number,
}

const CustomerDetailForm = React.memo(({ customer_name, customer_id }: CustomerDetailFormProps) => {
  const dispatch = useDispatch();
  // const customer_name = useSelector(select_customer_name);
  Use_Count_Renders(`Customer Detail Form - ${customer_name}`);

  // const customer_id = useSelector(select_customer_id);
  const access_token = useSelector(select_login_access_token);
  const initialValues = { name: customer_name || '', id: customer_id || -1 };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
  });

  const handleSubmit = useCallback(async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    console.log('customer submit values' + JSON.stringify(values, null, 2))
    const res = dispatch(customer_detail_slice.update({ data: values, access_token }))
    console.log('res: ' + JSON.stringify(res, null, 2));
  }, [dispatch]);
  console.log(`initialValues: ${JSON.stringify(initialValues, null, 2)}`);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ submitForm, isSubmitting }) => (
          <Form >
            <div className="row">
              <div className="col-md-3">
                <Field
                  component={TextField}
                  label="Name"
                  name="name"
                  id="name"
                />
              </div>

              <div className="col-md-3 mb-3 align-self-end">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Update
                                </Button>
              </div>
            </div>
            {isSubmitting && <LinearProgress />}
          </Form>
        )}
      </Formik>
    </div>
  )
});

export default CustomerDetailForm;