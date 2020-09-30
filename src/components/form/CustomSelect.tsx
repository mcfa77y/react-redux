import { SelectProps } from 'formik-material-ui';
import React from 'react';
import { StylesConfig } from 'react-select';
// import { FieldProps } from "formik";
import { MultipleSelect } from "react-select-material-ui";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends SelectProps {
  options: Option[];
  isMulti?: boolean;
  label: string;
}

const stylesFn: StylesConfig = {
  clearIndicator: (base: any) => ({
    ...base,
    color: "#d0d0d0",
    "&:hover": { color: "#a0a0a0" },
  }),
  container: (base:any, state:any) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  }),
 
};

function CustomSelect({
  field,
  form,
  meta,
  options,
  label,
  isMulti = false,
}: CustomSelectProps) {

  const onChange = (value: any, actionMeta: any) => {
    const tmp_value = actionMeta ? actionMeta : []
    const new_value = isMulti
      ? (tmp_value as Option[]).map((item: Option) => item.value)
      : (tmp_value as Option).value;
    form.setFieldValue(
      field.name,
      new_value
    );
  };

  const getValues = () => {
    console.log(`get values - field: ${JSON.stringify(field, null, 2)}`);
    if (options) {
      return field.value.map((v: any) => { return v.value });
    }
    else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <div>
      <MultipleSelect
        label={label}
        options={options}
        onChange={onChange}
        values={getValues()}
        SelectProps={{
          isCreatable: false,
          msgNoOptionsAvailable: `All ${label} are selected`,
          msgNoOptionsMatchFilter: `No ${label} name matches the filter`,
          styles: stylesFn,
          closeMenuOnSelect: false,
        }}
      />
    </div>
  )
}

export default CustomSelect
