import { useField } from 'formik';
import React from 'react';
import { StyledErrorMessage, StyledLabel } from './styled';

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <div className="form-group">
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <input className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </div>
    </>
  );
};
