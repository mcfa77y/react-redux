import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core';
type SwitchInput_Props =
    {
        id: string,
        description: string,
        value: boolean,
        klass?: string
        onChange: any
    }
export default function SwitchInput({ id, description, value, klass, onChange }: SwitchInput_Props) {

    return (
        <FormControlLabel
            control={<Switch 
                id={id}
                name={id}
                size="small"
                checked={value}
                onChange={onChange}
                color="primary"
                />}
            label={description}
        />

        // <div  className={"custom-control custom-switch " + klass}>
        //     <input type="checkbox"
        //         className="foobar custom-control-input"
        //         id={id}
        //         name={id}
        //         autoComplete="off"
        //         checked={value} />
        //     <label className="custom-control-label" htmlFor={id}>
        //         { description }
        //     </label>

        // </div>
    )
}
