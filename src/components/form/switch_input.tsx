import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core';
import { Use_Count_Renders } from '../../utils/use_count_renders';
type SwitchInput_Props =
    {
        id: string,
        description: string,
        value: boolean,
        klass?: string
        onChange: any
    }
const SwitchInput = React.memo(({ id, description, value, klass, onChange }: SwitchInput_Props) => {
    Use_Count_Renders('Switch Input: ' + id);
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
    )
});
export default SwitchInput;
