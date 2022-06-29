import React from 'react'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

export default function DatePicker(props) {

    const { name, label, value, required,error=null,onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    function getMonthFromString(mon){
        return new Date(Date.parse(mon +" 1, 1970")).getMonth()+1;
     }

    const dateToString = (date) => {
	    console.log('dateTosTring',date)
        var result='';
        try{
           var dateFields=date.toString().split(' ');
            result=dateFields[3]+'-'+getMonthFromString(dateFields[1])+'-'+dateFields[2];
        }catch (error){
            console.error(error);
            result='';
        }finally{
            return result;
        }    
    }
 
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                inputFormat="dd/MM/yyyy"
                name={name}
                value={value}
	    allowSameDateSelection={true}
                onChange={date =>{console.log('Change');onChange(convertToDefEventPara(name,dateToString(date)))}}
                renderInput={(params) => <TextField name={name} {...params} label={label} required={required}  {...(error && {error:true,helperText:error})}/>}
            />
        </LocalizationProvider>
    )
}
