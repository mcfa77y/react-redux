import { FormControl } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse/Collapse';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomSelect from '../../../components/form/CustomSelect';
import RichTextEditor from '../../../components/form/rich_text_edior/rich_text_editor';
import MySelectInput, { ItemListProp } from '../../../components/form/select_input';
import SwitchInput from '../../../components/form/switch_input';
import { select_login_access_token } from '../../login/login_slice';
import { report_detail_slice, update_html_json, update_report_json } from './report_detail_slice';


const to_title_case = (message: string) => {
  return message
    .split('_')
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}
type SelectListProps = {
  items: any
}
type ReportDetailEntity = {
  report: {
    html_json: { [key: string]: any },
    status_id: string,
    customer_id: string,
    tags: string[],
    tag_id_list: string[],
    name: string,
    id: string,
    password_decrypted: string,
    url: string,
  },
  has_plot: { [key: string]: any },
  status_list: SelectListProps,
  customer_list: SelectListProps,
  tag_list: SelectListProps,

}
type ReportDetailFormProps = {
  entity: ReportDetailEntity,
}

export default function ReportDetailForm({ entity }: ReportDetailFormProps) {
  const dispatch = useDispatch();

  const access_token = useSelector(select_login_access_token);

  const [form_foo, set_form_foo] = useState((
    <div>
      loading...
    </div>
  ));

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    console.log('report submit values' + JSON.stringify(values, null, 2))
    const res = await dispatch(report_detail_slice.update({ data: values, access_token }))
    console.log('res: ' + JSON.stringify(res, null, 2));
  }

  const handleSwitchChange = useCallback((event: any) => {
    console.log(event.target.id + '\t' + event.target.checked);
    dispatch(update_html_json({
      key: event.target.id,
      value: event.target.checked
    }))
  }, []);

  const handleTextAreaChange = useCallback((id: string, value: string): void => {
    dispatch(update_html_json({
      key: id,
      value
    }));
  }, []);

  const handleStatusSelectChange = useCallback((event: any) => {
    console.log(event.target.id + '\t' + event.target.checked);
    dispatch(update_report_json({
      key: event.target.id,
      value: event.target.value
    }))
  }, []);
  const [available_plot_list, set_available_plot_list] = useState([] as string[]);
  // const [switch_list, set_switch_list] = useState([] as JSX.Element[]);
  // const [text_area_list, set_text_area_list] = useState([] as JSX.Element[]);

  const report = entity?.report;
  const has_plot = entity?.has_plot;
  useEffect(() => {
    if (report === undefined || has_plot === undefined) return;
    const tmp = Object.keys(has_plot)
      .filter((key) => has_plot[key]);
    set_available_plot_list(tmp);
    console.log('setup available plot list:\t' + tmp);

  }, [has_plot]);

  useEffect(() => {
    if (!report || available_plot_list.length === 0) return;
    let status_list: ItemListProp[] = [];
    status_list = entity.status_list?.items || []
    let customer_list: ItemListProp[] = [];
    customer_list = entity.customer_list?.items || []
    let tag_list: ItemListProp[] = [];
    tag_list = entity.tag_list?.items || []
    let tag_option_list = tag_list.map((tag) => {
      return {
        label: tag.description,
        value: tag.id
      }
    })
    const switch_meta_list = available_plot_list.map(key => {
      const plot_name = key.replace('has_', '');
      const id = 'is_show_' + plot_name;
      const value = report.html_json[id];
      // strip _plot and Title Case
      const desc = to_title_case(plot_name.replace('_plot', ''));
      return {
        id,
        value,
        desc,
      }
    });

    const tmp_switch_list = switch_meta_list
      .reduce((acc, {
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
      }, [] as JSX.Element[])
    // set_switch_list(tmp_switch_list);

    const text_meta_list = available_plot_list.map(key => {
      let name = key.replace('has_', '').replace('_plot', '');
      if (name === 'poi_cluster') {
        name = "location_foot_traffic"
      }
      else if ('regional_table' === name) {
        name = 'regional_breakdown'
      }
      else if ('reference_table' === name) {
        name = 'reference'
      }
      const id = name + '_text_html';
      const value = report.html_json[id] || '';
      // strip _plot and Title Case
      const desc = to_title_case(name);

      const plot_name = key.replace('has_', '');
      const is_show_key = 'is_show_' + plot_name;
      return {
        id,
        value,
        desc,
        is_show_key,
      }
    });

    const tmp_text_area_list = text_meta_list
      .reduce((acc, {
        id,
        value,
        desc,
        is_show_key,
      }) => {
        // const wrapper = useRef();

        const el = (
          <Collapse

            key={`${id}_rte`} in={report.html_json[is_show_key]} >
            <div className="row">
              <div className="col">
                <div className="form-group label-floating">
                  <label htmlFor={id} className="control-label">{desc}</label>
                  <RichTextEditor
                    id={id}
                    value={value}
                    onChange={handleTextAreaChange} />
                </div>
              </div>
            </div>
          </Collapse>
        )
        acc.push(el);
        return acc;
      }, [] as JSX.Element[]);

    // set_text_area_list(tmp_text_area_list);
    const status_init = {
      id: 'status_id',
      value: report['status_id']
    };
    const customer_init = {
      id: 'customer_id',
      value: report['customer_id']
    };
    const tag_init = {
      id: 'tag_id_list', 
      value: report.tags ?
          report.tags.filter((tag: any) => report['tag_id_list'].includes(tag.id))
            .map((tag: any) => { return { label: tag.description, value: tag.id } }) :
          []
    };
    const initial_values = [
      ...switch_meta_list,
      ...text_meta_list,
      ...[status_init],
      ...[tag_init],
      ...[customer_init]]
      .reduce((acc, {
        id,
        value,
      }) => {
        acc[id] = value;
        return acc;
      }, {
        name: report?.name || 'xxx',
        id: report?.id || -1,
        status_id: report?.status_id || -1,
      } as any);

    console.log(`initial_values: ${JSON.stringify(initial_values, null, 2)}`);

    set_form_foo((
      <>
        <pre>
          {JSON.stringify(initial_values, null, 2)}
        </pre>
        <Formik
          initialValues={initial_values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          <Form >
            <div className="row mb-3">
              <div className="col-sm-6 col-md-6 col-lg-3">
                <Field
                  component={TextField}
                  label="Name"
                  name="name"
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <MySelectInput
                  name='status_id'
                  label='Status'
                  item_list={status_list}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <MySelectInput
                  name='customer_id'
                  label='Customer'
                  item_list={customer_list}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <FormControl style={{ width: "100%" }}>
                  <Field
                    component={CustomSelect}
                    name='tag_id_list'
                    options={tag_option_list}
                    isMulti={true}
                    label='Tags'
                  >
                  </Field>
                </FormControl>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col mx-auto">
                {tmp_switch_list}
              </div>
            </div>
            {tmp_text_area_list}
            <div className="col-md-3 mb-3 align-self-end">
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </Form>
        </Formik>
      </>
    ))


  }, [report]);


  // console.log('initialValues', JSON.stringify(initial_values, null, 2));

  const password_decrypted = report?.password_decrypted || '';
  const url = report?.url || '';
  const initial_values = {
    name: "no name'"
  }
  return (
    <div>
      <pre>
        {/* {JSON.stringify(simple_report, null, 2)} */}
        <br />
        {JSON.stringify(has_plot, null, 2)}
      </pre>
      {/* <pre> init values:
        {JSON.stringify(initial_values, null, 2)}
      </pre> */}

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

      {form_foo}





    </div >
  )
}
