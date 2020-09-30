import { useField } from 'formik';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { StyledErrorMessage, StyledLabel } from './styled';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
// type MyTextInputProps = {
//   label: string,
//   id: string,
//   name?:string,
// }
export const MyTextInput = ({ label, id, name, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.

  const [field, meta] = useField(props);
  const classes = useStyles();
  let error_msg = '';
  if (meta.touched && meta.error) {
    error_msg = meta.error;
  }
  return (
    <>
      <div className="form-group">
        <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
        <input className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </div>

     
    </>
  );
};

// export default function BasicTextFields() {
//   const classes = useStyles();

//   return (
//     <form className={classes.root} autoComplete="off">
//       <TextField
//         id={id}
//         label={label}
//         defaultValue={default_value}
//         helperText="Some important text"
//       />
//     </form>
//   );
// }
