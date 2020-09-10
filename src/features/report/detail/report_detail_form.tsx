import React from 'react'
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { MyTextInput } from '../../../components/form/text_input';
import * as Yup from 'yup';
import { report_detail_slice, update_html_json, select_report } from './report_detail_slice';
import { select_login_access_token } from '../../login/login_slice';
import SwitchInput from '../../../components/form/switch_input';

import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import RichTextEditor from '../../../components/form/rich_text_edior/rich_text_editor'
const to_title_case = (message: string) => {
  return message
    .split('_')
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}
export default function ReportDetailForm() {
  const dispatch = useDispatch();
  const { entity } = useSelector(select_report);
  const { report, has_plot } = entity;

  const access_token = useSelector(select_login_access_token);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    console.log('report submit values' + JSON.stringify(values, null, 2))
    const res = await dispatch(report_detail_slice.update({ data: values, access_token }))
    console.log('res: ' + JSON.stringify(res, null, 2));
  }

  const handleSwitchChange = (event: any) => {
    console.log(event.target.id + '\t' + event.target.checked);
    dispatch(update_html_json({
      key: event.target.id,
      value: event.target.checked
    }))
  }
  let initialValues = {
    name: report?.name || '',
    id: report?.id || -1,
  };
  let switch_list: Element[] = [];
  let text_area_list: Element[] = [];
  let simple_report = {};
  if (report !== undefined) {

    let { plot_json, ...simple_report } = report;
    const available_plot_list = Object.keys(has_plot)
      .filter((key) => has_plot[key]);

    const switch_meta_list = available_plot_list.map(key => {
      const plot_name = key.replace('has_', '');
      const id = 'is_show_' + plot_name;
      const value = report.html_json[id];
      // strip _plot and Title Case
      const desc = to_title_case(plot_name.replace('_plot', ''));
      return {
        plot_name,
        id,
        value,
        desc,
      }
    });

    switch_list = switch_meta_list
      .reduce((acc, {
        plot_name,
        id,
        value,
        desc,
      }) => {
        const switch_el = (
          <SwitchInput key={id}
            id={id}
            description={desc}
            value={value}
            onChange={handleSwitchChange}
            klass='col-sm-4 col-md-3 col-lg-2 mx-1' />
        )
        acc.push(switch_el);
        return acc;
      }, [] as any)

    const text_meta_list = available_plot_list.map(key => {
      let name = key.replace('has_', '').replace('_plot', '');
      if (name === 'poi_cluster') {
        name = "location_foot_traffic"
      }
      else if ('regional_table' === name) {
        name = 'regional'
      }
      else if ('reference_table' === name) {
        name = 'reference'
      }
      const id = name + '_text_html';
      const value = report.html_json[id] || '';
      // strip _plot and Title Case
      const desc = to_title_case(name);
      return {
        id,
        value,
        desc,
      }
    });

    text_area_list = text_meta_list
      .reduce((acc, {
        id,
        value,
        desc,
      }) => {
        const cb = (id: string): (value: string) => void => {
          const cb_inner = (value: string) => {
            dispatch(update_html_json({
              key: id,
              value
            }))
          }
          return cb_inner;
        }
        const el = (
          <div className="row">
            <div className="col">
              <div className="form-group label-floating">
                <label htmlFor={id} className="control-label">{desc}</label>
                <RichTextEditor
                  id={id}
                  value={value}
                  cb={cb(id)}/>
              </div>
            </div>
          </div>
        )
        acc.push(el);
        return acc;
      }, [] as any)

    initialValues = switch_meta_list.reduce((acc, {
      id,
      value,
    }) => {
      acc[id] = value;
      return acc;
    }, initialValues as any);
  }
  console.log('initialValues', JSON.stringify(initialValues, null, 2));
  const password_decrypted = report?.password_decrypted || '';
  const url = report?.url || '';
  return (
    <div>
      <pre>
        {/* {JSON.stringify(simple_report, null, 2)} */}
        <br />
        {JSON.stringify(has_plot, null, 2)}
      </pre>

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="password" name="password" aria-label="Password" readOnly
              aria-describedby="basic-addon2" value={password_decrypted} />
            <div className="input-group-append">
              <button id="generate-password-button" className="btn btn-outline-secondary"
                type="button">Generate Password</button>
            </div>
          </div>

        </div>
        <div className="col-sm-12 col-md-6">
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="url" name="url" aria-label="URL" readOnly
              aria-describedby="basic-addon2" value={url} />
            <div className="input-group-append">
              <button id="generate-url-button" className="btn btn-outline-secondary" type="button">Generate
                                URL</button>
            </div>
          </div>
        </div>

      </div>
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
          </div>
          <div className="row">
            {switch_list}
          </div>
          {text_area_list}
          <div className="col-md-3 mb-3 align-self-end">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </Form>
      </Formik>
    </div >
  )
}
