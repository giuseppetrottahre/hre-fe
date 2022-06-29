import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next';
import '../i18n';
import Controls from "../components/controls/Controls";
import { useForm } from '../components/useForm';
import axios from 'axios';
import Constants from '../conf/constants';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const initialFValues = {
    codicefiscale:''
}




export default function Cancellazione() {
    const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});

    
    const [alertConf,setAlertConf]=useState();
    const [openDialog,setOpenDialog]=useState(false);

    const messages_info_box={
      "REQUEST_TAKING_IN_CHARGE":t("REQUEST_TAKING_IN_CHARGE"),
      "USER_NOT_FOUND":t("USER_NOT_FOUND")
  }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('codicefiscale' in fieldValues)
            temp.codicefiscale = fieldValues.codicefiscale ? "" : i18n.t('codicefiscale')
                  
        setErrors({
            ...temp
        })
 
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);




    const RemoveUserExistence=()=>{
        axios.get(Constants.CANCELLAZIONE_CHECK_UTENTE.replace("codicefiscale",values.codicefiscale))
        .then(response => {
            console.log(response.data.message);
             setAlertConf(response.data.message);  
             setOpenDialog(true);
        })
        .catch(error => { console.error(error) })
    
      }

      const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiFormControl-root': {
                width: '80%',
                margin: theme.spacing(1)
            }
        }
    }))
    
    const classes = useStyles();
    
    const handleClose=()=>{
        setOpenDialog(false);
        setAlertConf();
        window.location.href="https://hr-executive.it/";
        //window.location.replace("https://prc-srl.com");//non entra in hitstory
    }

    return (
      <Box
      mt={2}
      className={classes.root}
    > 

<Box mt={5} sx={{
display: 'flex',
flexWrap: 'no-wrap',
justifyContent: 'space-around',
alignItems:'center'
}}>
          <Controls.Input name="codicefiscale" label="Codice Fiscale" type="text" value={values.codicefiscale} required={true} onChange={handleInputChange} error={errors.codicefiscale} />
          <Box>
          <Controls.Button disabled={values.codicefiscale.length===0}text="Invia" onClick={RemoveUserExistence}/>
          </Box>
         
          </Box>

          <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex',justifyContent: "space-around"}}>
               {alertConf==='REQUEST_TAKING_IN_CHARGE'?<CheckCircleOutlineIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}}/>:<WarningAmberIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}} />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {messages_info_box[alertConf]}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-around"}}>
        <Controls.Button onClick={handleClose} text="CONFERMA"/>
        </DialogActions>
      </Dialog>

        </Box>
   
   );
  }
