import React from 'react'
import TextField from '@mui/material/TextField';

export default function Input(props) {
    /*inputProps={{ style: { textTransform: "uppercase" } }}*/
    const { name, label, required, value,error=null, type, onChange } = props;
    return (
        <TextField
            variant="outlined"
            required={required}
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        
        />
    )
}
