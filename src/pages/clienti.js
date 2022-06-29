import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import Grid from '@mui/material/Grid';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import axios from 'axios';
import Constants from '../conf/constants';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import { makeStyles,useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft:'20px', 
    width:'95%',
    display:'flex',
    /*
     [theme.breakpoints.up('md')]: {
       flexDirection: 'column-reverse'
     },
     */
   },
 }));

const initialFValues = {
nome:'',
cognome:'',
email:'',
azienda:'',
citta:'',
cap:'',
provincia:'',
testoemail:'',
filepresentazione:''
}

export default function Clienti() {
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));

  const theme = useTheme();
  const classes = useStyles(theme);
    const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});
    const[disable,setDisable]=useState(true)
    const[presentationFile,setPresentationFile]=useState(null)
    const [alertConf,setAlertConf]=React.useState();
    const [openDialog,setOpenDialog]=useState(false);

    const messages_info_box={
      "CLIENT_EXISTS":t("CLIENT_EXISTS"),
      "CLIENT_ERRORS":t("CLIENT_ERRORS"),
      "CLIENT_SUCCESS":t("CLIENT_SUCCESS")
  }

  const handleClose=()=>{
    setOpenDialog(false);
    setAlertConf();
    window.location.href="https://hr-executive.it/";
}

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nome' in fieldValues)
            temp.nome = fieldValues.nome ? "" : i18n.t('errore_nome')
        if ('cognome' in fieldValues)
            temp.cognome = fieldValues.cognome ? "" : i18n.t('errore_cognome')
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : i18n.t('errore_email')
        if ('azienda' in fieldValues)
            temp.azienda = fieldValues.azienda ? "" : i18n.t('errore_azienda')
        if ('citta' in fieldValues)
            temp.citta = fieldValues.citta ? "" : i18n.t('errore_citta')
        if ('cap' in fieldValues)
            temp.cap = fieldValues.cap.length > 4 ? isNaN(fieldValues.cap.trim()) ? i18n.t('errore_cap_not_valid'):"":fieldValues.cap.length > 0? i18n.t('errore_cap_not_valid'): i18n.t('errore_cap')
       if ('provincia' in fieldValues)
            temp.provincia = fieldValues.provincia ? "" : i18n.t('errore_provincia')
        if ('testoemail' in fieldValues)
            temp.testoemail = fieldValues.testoemail ? "" : i18n.t('errore_testoemail')                          
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            const formData = new FormData();
            formData.append("jsondata", JSON.stringify(values));
            if(presentationFile!==null)
                formData.append('file', presentationFile);
            const config = {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }

            axios.post(Constants.REGISTRAZIONE_CLIENTI,formData,config)
            .then(response=>{console.log(response)
                    setAlertConf(response.data.message);
                    setOpenDialog(true);  
            })
            .catch(error=>{console.log(error)})
            resetForm()
            setPresentationFile(null)
        }
    }



    const updateUploadedFile = (file) =>{
        setPresentationFile(file.files[0]);
     }



    return (
        <Form onSubmit={handleSubmit}>
            
                  <Box
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: 'white',
          marginTop:'5px'
        }}
      >
                  <Box
                  mt={2}
                  sx={{
                    width: '100%',
                  }}
                > 
          <Accordion expanded={true} >
          <Typography variant="h5" align='center' sx={{ /*width:'33%',*/ flexShrink: 0 }}>
                Form Clienti
              </Typography>
          <Box mt={5}>
        <Grid  container>
            <Grid item xs={6}    sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                <Controls.Input
                    name="nome"
                    label={t('nome')}
                    value={values.nome}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.nome}
                />
                      
                <Controls.Input
                    name="email"
                    label={t('email')}
                    value={values.email}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.email}
                />
                <Controls.Input
                    name="provincia"
                    label={t('provincia')}
                    value={values.provincia}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.provincia}
                />
                  <Controls.Input
                    name="citta"
                    label={t('citta')}
                    value={values.citta}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.citta}
                />

                <Controls.FilePicker
                    name="filepresentazione"
                    label={t('filepresentazione')}
                    value={values.filepresentazione}
                    onChange={handleInputChange}
                    callbackOnChange={updateUploadedFile}
                    required={false}
                    maxSizeMb={0}
                    fileType="application/pdf"
                    error={errors.filepresentazione}
               />
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>

            <Controls.Input
                    name="cognome"
                    label={t('cognome')}
                    value={values.cognome}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.cognome}
                />
                <Controls.Input
                    name="azienda"
                    label={t('azienda')}
                    value={values.azienda}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.azienda}
                />
               <Controls.Input name="cap" label={t('cap')} type="text" value={values.cap} required={true} onChange={handleInputChange} error={errors.cap}/>

               <Controls.Input
                    name="testoemail"
                    label={t('testoemail')}
                    value={values.testoemail}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.testoemail}
                />
                <Box sx={{ display: 'flex',flexWrap: 'wrap'}}>
                <Controls.Checkbox
                name="privacy"
                label="Acconsento al trattamento dei dati"
                onChange={()=>{setDisable(!disable)}}
              />
              <a style={{color:"#a29256", paddingLeft:'40px'}} href="https://www.hr-executive.it/privacy-policy" target="_blank" rel="noreferrer noopener"> Privacy Policy </a>
              </Box>
            </Grid>
        </Grid>
        </Box>
        <Box mt={5} sx={{
            display: 'flex',
            flexWrap: 'no-wrap',
            justifyContent: 'center',
            marginBottom:'10px'
          }}>
                    <Controls.Button
                    disabled={disable}
                        type="submit"
                        text="Invia" />
                </Box>
                
                </Accordion>
                </Box>
                </Box>
                <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex',justifyContent: "space-around"}}>
               {alertConf==='CLIENT_SUCCESS'?<CheckCircleOutlineIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}}/>:<WarningAmberIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}} />}
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

    </Form>
    );
  }
