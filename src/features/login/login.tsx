import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { MyTextInput } from '../../components/form/text_input';
import { Debug } from '../../components/debug';
import { Use_Count_Renders } from '../../utils/use_count_renders';
import { TextField } from 'formik-material-ui';
const { select_login, login_slice } = require('./login_slice.ts');


export const Login = () => {
  const {
    entity_detail, loading, currentRequestId, error,
  } = useSelector(select_login);

  const dispatch = useDispatch();

  const initialValues = { password: '49d865c3ce954c2d', email: 'foo@bar.com' };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    const { email, password } = values;
    return dispatch(login_slice
      .async_thunk({ email, password }))
      .then((res: any) => {
        console.log(JSON.stringify(res, null, 2));
        // TODO: if res success then change location
        // otherwise show error
        // window.location.href = '/user';
      })
  };

  Use_Count_Renders('Login');
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Login</h5>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="card-text mb-3">
                  <Field
                    component={TextField}
                    label="Email"
                    name="email"
                    type="email"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="card-text mb-3">
                  <Field
                    component={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    style={{ width: "100%" }}
                  />
                </div>
                <button type="submit" className="btn btn-primary float-right">Submit</button>
              </Form>
            </Formik>
          </div>
        </div>
      <Debug entity={entity_detail}
        error={error}
        loading={loading}
        currentRequestId={currentRequestId} />
      </div>
    </div>
  );
};

//  export default Login;