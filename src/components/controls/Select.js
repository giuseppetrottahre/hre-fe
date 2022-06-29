import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../i18n';
export default function Select(props) {
    const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});
    const { name, label, value,error=null, disabled,onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{t(item.id)}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
