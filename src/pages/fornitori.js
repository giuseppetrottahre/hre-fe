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


const tipologialocation=[  {id:"altro"},
{id:"auditorium"},
{id:"centrocongressi"},
{id:"fabbrica"},
{id:"galleriadarte"},
{id:"hotel"},
{id:"loft"},
{id:"magazzino"},
{id:"negozio"},
{id:"showroom"},
{id:"spazioespositivo"},
{id:"teatro"}]


const categoriafornitore=[  {id:"altro"},
{id:"alestimenti"},
{id:"bodyguardSecurity"},
{id:"catering"},
{id:"crm"},
{id:"fotografi"},
{id:"grafici"},
{id:"guidaTuristica"},
{id:"location"},
{id:"ncceNoleggiomezzi"},
{id:"organizzatorediEventi"},
{id:"produzioneGadget"},
{id:"serviceAudiovideo"},
{id:"tourLeader"},
{id:"traduttorieInterpreti"}]

const initialFValues = {
nome:'',
cognome:'',
email:'',
azienda:'',
citta:'',
cap:'',
provincia:'',
categoriafornitore:'',
tipologialocation:'',
filepresentazione:''
}

export default function Fornitori() {
    const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});

    const[presentationFile,setPresentationFile]=useState(null)
    const [alertConf,setAlertConf]=React.useState();
    const [openDialog,setOpenDialog]=useState(false);

    const messages_info_box={
      "SUPPLIER_EXISTS": t("SUPPLIER_EXISTS"),
      "SUPPLIER_ERRORS": t("SUPPLIER_ERRORS"),
      "SUPPLIER_SUCCESS":t("SUPPLIER_SUCCESS")
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
            temp.cap = fieldValues.cap.length > 4 ? isNaN(fieldValues.cap.trim()) ? "C.A.P. non valido":"":fieldValues.cap.length > 0? "C.A.P. non valido": "Richiesto"
        if ('provincia' in fieldValues)
            temp.provincia = fieldValues.provincia ? "" : i18n.t('errore_provincia')            
        if('categoriafornitore' in fieldValues){
            temp.categoriafornitore=fieldValues.categoriafornitore?"": i18n.t('errore_categoriafornitore')   
            if(i18n.t(fieldValues.categoriafornitore)!==i18n.t('location')){
                fieldValues.tipologialocation='';
                values.tipologialocation='';
            }
        }            
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

            axios.post(Constants.REGISTRAZIONE_FORNITORI,formData,config)
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
          <Typography variant="h5" align='center' sx={{ /*width: '33%',*/ flexShrink: 0 }}>
                Fornitori
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
                    name="citta"
                    label={t('citta')}
                    value={values.citta}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.citta}
                />

                <Controls.Input
                    name="provincia"
                    label={t('provincia')}
                    value={values.provincia}
                    onChange={handleInputChange}
                    required={true}
                    error={errors.provincia}
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

               <Controls.Select
                    name="categoriafornitore"
                    label={t('categoriafornitore')}
                    value={values.categoriafornitore}
                    onChange={handleInputChange}
                    options={categoriafornitore}
                    required={true}
                    error={errors.categoriafornitore}
               />
               {i18n.t(values.categoriafornitore)===i18n.t('location') &&
               <Controls.Select
                    name="tipologialocation"
                    label={t('tipologialocation')}
                    value={values.tipologialocation}
                    onChange={handleInputChange}
                    options={tipologialocation}
                    error={errors.tipologialocation}
               />
                }
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
               {alertConf==='SUPPLIER_SUCCESS'?<CheckCircleOutlineIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}}/>:<WarningAmberIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}} />}
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
