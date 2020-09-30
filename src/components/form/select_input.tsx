import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'formik';
import { Select } from 'formik-material-ui';
import Chip from '@material-ui/core/Chip/Chip';

export type ItemListProp = {
    id: string,
    description: string,
    code?: string
}

type SelectInputProps = {
    name: string,
    label: string,
    item_list: ItemListProp[]
    is_multiple?: boolean,
}

function MySelectInput({ name, label, item_list, is_multiple = false }: SelectInputProps) {
    
    const menu_item_list: JSX.Element[] = item_list.map(({ id, description }) => {
        return (
            <MenuItem
                key={id + "_menu_item"}
                value={id}>{description}</MenuItem>
        )
    })
    
    return (
        <FormControl style={{ width: "100%" }}>
        <InputLabel shrink={true} htmlFor={name}>
          {label}
        </InputLabel>
        <Field
          component={Select}
          type="text"
          name={name}
          multiple={is_multiple}
          inputProps={{
            name: name,
            id: name,
          }}
        >
          {menu_item_list}
        </Field>
      </FormControl>
    )
}

export default MySelectInput
