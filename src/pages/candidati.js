import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next';
import '../i18n';
import Grid from '@mui/material/Grid';
import Controls from "../components/controls/Controls";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useForm, Form } from '../components/useForm';
import axios from 'axios';
import Constants from '../conf/constants';
import FacebookIcon from '@mui/icons-material/Facebook';
const genderItems = [
  { id: 'M'},
  { id: 'F'},
]

const levels = [
  { id: 'Nessuna'},
  { id: 'Principiante'},
  { id: 'Elementare'},
  { id: 'Intermedio'},
  { id: 'Alto Intermedio'},
  { id: 'Avanzato'},
  { id: 'Fluente'},
]

const eye_colors=[
  {id:'azzurri'},
  {id:'grigi'},
  {id:'marroni'},
  {id:'neri'},
  {id:'nocciola'},
  {id:'verdi'}
]


const hair_colors=[
  {id:'biondi'},
  {id:'castani'},
  {id:'neri'},
  {id:'rossi'},
  {id:'viola'}
]



const taglia_vestito=[
  {id:'36'},
  {id:'36/38'},
  {id:'38'},
  {id:'38/40'},
  {id:'40 '},
  {id:'40/42'},
  {id:'42'},
  {id:'42/44'},
  {id:'44'},
  {id:'44/46'},
  {id:'46'},
  {id:'46/48'},
  {id:'48'},
  {id:'48/50'},
  {id:'50 '},
  {id:'50/52'},
  {id:'52'},
  {id:'52/54'},
  {id:'54'},
  {id:'54/56'},
  {id:'56'},
]

const numero_scarpe=[
{id:'34'},
{id:'34 e 1/2'},
{id:'35'},
{id:'35 e 1/2'},
{id:'36'},
{id:'36 e 1/2'},
{id:'37'},
{id:'37 e 1/2'},
{id:'38'},
{id:'38 e 1/2'},
{id:'39'},
{id:'39 e 1/2'},
{id:'40'},
{id:'40 e 1/2'},
{id:'41'},
{id:'41 e 1/2'},
{id:'42'},
{id:'42 e 1/2'},
{id:'43'},
{id:'43 e 1/2'},
{id:'44'},
{id:'44 e 1/2'},
{id:'45'},
{id:'45 e 1/2'},
{id:'46'},
{id:'46 e 1/2'},
{id:'47'},
{id:'47 e 1/2'},
{id:'48'},
{id:'48 e 1/2'}
]

var nations = []
var cap = []
var provincie = []
var regioni = []
var citta = []

const initialFValues = {
  //STEP 1
  nome: '',
  secondoNome: '',
  cognome: '',
  mail: '',
  genere: '',
  cellulare: '',
  telefono: '',
  codicefiscale: '',
  indirizzodomicilio: '',
  provincia: '',
  citta: '',
  cap: '',
  nazionedinascita: '',
  provinciadinascita: '',
  cittadinascita: '',
  note: '',
  datadinascita: (new Date()).toISOString().split('T')[0],
  //STEP 2
  titolodistudi: '',
  annodiconseguimento: '',
  notepersonali: '',
  istituto: '',
  votazione: '',
  inglese: '',
  francese: '',
  tedesca: '',
  spagnola: '',
  altrelingue: '',
  fblink:'',
  instalink:'',
  //STEP 3
  haccp: false,
  primosoccorso: false,
  antincendio: false,
  tesserinoaeroporto: false,
  brevetto: false,
  tesserinosicurezza: false,
  automunito: false,
  patenteauto:false,
  completonero: false,
  scarpanera: false,
  tubinoneroelegante:false, 
  tailleurneropantalone:false,
  tailleurnerogonna:false,
  scarpedecolletenere:false,
  //STEP 4
  filenameinputcv: '',
  filenameinputprofiloimg: ''
}

export default function Candidati() {

  const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});

  const[files,setFiles]=useState([])
  const [alertConf,setAlertConf]=React.useState();
  const [openDialog,setOpenDialog]=useState(false);

  const messages_info_box={
    "USER_EXISTS":t("USER_EXISTS"),
    "USER_ERRORS":t("USER_ERRORS"),
    "USER_SUCCESS":t("USER_SUCCESS"),
    "REQUEST_TAKING_IN_CHARGE":t("REQUEST_TAKING_IN_CHARGE"), 
    "USER_NOT_FOUND":t("USER_NOT_FOUND"), 
    "USER_ID_NOT_VALID":t("USER_ID_NOT_VALID"), 
    "EVENT_ID_NOT_VALID":t("EVENT_ID_NOT_VALID"), 
    "EVENT_NOT_FOUND":t("EVENT_NOT_FOUND"), 
    "PROPOSAL_CONFIRMED":t("PROPOSAL_CONFIRMED"), 
    "PROPOSAL_EROOR":t("PROPOSAL_ERROR")  
}

const handleOpen=(alert_value)=>{
  setAlertConf(alert_value);  
  setOpenDialog(true);
}

const handleClose=()=>{
  setOpenDialog(false);
  setAlertConf();
  window.location.href="https://hr-executive.it/";
}

  const updateUploadedFile = (file) =>{
    const isElementIdPresent = (element) => element.id===file.id;
    var index=files.findIndex(isElementIdPresent)
    if(index>0)
      files.splice(index,1)
    setFiles([...files, { id: file.id, uploaded_file:file.files[0]}]);
}
  //iltasto submit da abilitare solo se tutte le informazioni richieste sono presenti
  function isDisabledSubmit() {
    var fieldRequired = ['nome',
    'cognome',
    'mail',
    'genere',
    'cellulare',
    'codicefiscale',
    'indirizzodomicilio',
    'provincia',
    'citta',
    'cap',
    'nazionedinascita',
    'provinciadinascita',
    'cittadinascita',
    'datadinascita',
    'titolodistudi',
    'annodiconseguimento',
    'istituto',
    'votazione',
    'inglese',
    'filenameinputcv',
    'filenameinputprofiloimg'
  ]
    var esito = false;
    fieldRequired.forEach(x => esito = esito || (values[x] === ''))
    return esito
  }

  function stringCmp(s1, s2) {
    if (s1.id < s2.id) {
      return -1;
    }
    if (s1.id > s2.id) {
      return 1;
    }
    return 0;
  }

  const [eventid,setEventid]=React.useState('');

  React.useEffect(() => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setEventid(params["ide"]);
    axios.get(Constants.LISTA_COMUNI)
      .then(response => {
        response.data.forEach(function (item) {
          // {regione: 'AAAAA',  id: 1, cap: 'BBBBB', provincia: 'CCCC', comune: 'DDDD'}
          /*if (cap.findIndex(i => i.id === item['cap']) === -1)*/ cap.push({ "id": item['cap'], "title": item['cap'], "citta": item['comune'] })
          if (regioni.findIndex(i => i.id === item['regione']) === -1) regioni.push({ "id": item['regione'], "title": item['regione'] })
          if (provincie.findIndex(i => i.id === item['provincia']) === -1) provincie.push({ "id": item['provincia'], "title": item['provincia'] })
          if (citta.findIndex(i => i.id === item['comune']) === -1) citta.push({ "id": item['comune'], "title": item['comune'], "provincia": item['provincia'] })
        });

        cap.sort((a, b) => stringCmp(a, b));
        provincie.sort((a, b) => stringCmp(a, b));
        citta.sort((a, b) => stringCmp(a, b));
      })
      .catch(error => { console.error(error) })

    //Lista stati 

    axios.get(Constants.LISTA_STATI)
      .then(response => {
        response.data.forEach(function (item) {
          nations.push({ "id": item['stato'], "title": item['stato'] })
        })
      })
      .catch(error => { console.error(error) })
  }
    , [])

  const validate = (fieldValues = values) => { return true }

  const isValidatedPanelStep1 = (fieldValues = values) => {
    let temp = { ...errors }
    if ('nome' in fieldValues)
      temp.nome = fieldValues.nome ? "" : "Richiesto"
    if ('cognome' in fieldValues)
      temp.cognome = fieldValues.cognome ? "" : "Richiesto"
    if ('mail' in fieldValues)
      temp.mail = fieldValues.mail.length > 0 ? (/$^|.+@.+..+/).test(fieldValues.mail) ? "" : "Email non valida" : "Email non valida"
    if ('genere' in fieldValues)
      temp.genere = (fieldValues.genere) ? "" : "Selezionare il genere"
    if ('cellulare' in fieldValues)
      temp.cellulare = fieldValues.cellulare.length > 0 ? (/^[0-9]+$/).test(fieldValues.cellulare) ? "" : "Numero non valido" : "Numero richiesto"
    if (('telefono' in fieldValues) && fieldValues.telefono.length>0)
      temp.telefono = (/^[0-9]+$/).test(fieldValues.telefono) ? "" : "Numero non valido"
    if ('codicefiscale' in fieldValues)
      temp.codicefiscale = fieldValues.codicefiscale ? "" : "Richiesto"
    if ('indirizzodomicilio' in fieldValues)
      temp.indirizzodomicilio = fieldValues.indirizzodomicilio ? "" : "Richiesto"
    if ('provincia' in fieldValues)
      temp.provincia = fieldValues.provincia ? "" : "Richiesto"
    if ('citta' in fieldValues)
      temp.citta = fieldValues.citta ? "" : "Richiesto"
    if ('cap' in fieldValues)
      temp.cap = fieldValues.cap.length > 4 ? isNaN(fieldValues.cap.trim()) ? "C.A.P. non valido":"":fieldValues.cap.length > 0? "C.A.P. non valido": "Richiesto"
    if ('nazionedinascita' in fieldValues)
      temp.nazionedinascita = fieldValues.nazionedinascita ? "" : "Richiesto"
    if ('provinciadinascita' in fieldValues)
      temp.provinciadinascita = fieldValues.provinciadinascita ? "" : "Richiesto"
    if ('cittadinascita' in fieldValues)
      temp.cittadinascita = fieldValues.cittadinascita ? "" : "Richiesto"
    if ('datadinascita' in fieldValues){
      var date18 = new Date();
      date18.setFullYear(date18.getFullYear()-18);
      var insertedDate= new Date(fieldValues.datadinascita);
      temp.datadinascita = insertedDate <= date18 ? "" : "Data non valida"
    }
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const isValidatedPanelStep2 = (fieldValues = values) => {
    let temp = { ...errors }
    if ('titolodistudi' in fieldValues)
      temp.titolodistudi = fieldValues.titolodistudi ? "" : "Richiesto"
    if ('annodiconseguimento' in fieldValues)
      temp.annodiconseguimento = fieldValues.annodiconseguimento ? "" : "Richiesto"
    if ('istituto' in fieldValues)
      temp.istituto = fieldValues.istituto ? "" : "Richiesto"
    if ('votazione' in fieldValues)
      temp.votazione = fieldValues.votazione ? "" : "Richiesto"
    if ('inglese' in fieldValues)
      temp.inglese = fieldValues.inglese ? "" : "Richiesto"
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  const isValidatedPanelStep3 = (fieldValues = values) => { return true }
  const isValidatedPanelStep4 = (fieldValues = values) => {
    let temp = { ...errors }
    if ('filenameinputcv' in fieldValues)
      temp.filenameinputcv = fieldValues.filenameinputcv ? "" : "Richiesto"
    if ('filenameinputprofiloimg' in fieldValues)
      temp.filenameinputprofiloimg = fieldValues.filenameinputprofiloimg ? "" : "Richiesto"

    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const isValidatedPanel = (panel) => {
    if (panel === 'panel1')
      return isValidatedPanelStep1()
    if (panel === 'panel2')
      return isValidatedPanelStep2()
    if (panel === 'panel3')
      return isValidatedPanelStep3()
    if (panel === 'panel4')
      return isValidatedPanelStep4()
  }


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);


  const [expanded, setExpanded] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("panel:" + panel + ",isExpanded:" + isExpanded);
    if (isExpanded === false) {
      if (isValidatedPanel(panel))
        setExpanded(isExpanded ? panel : false);
      setActivePanel('');
    } else {
      if (activePanel === '') {
        setExpanded(isExpanded ? panel : false);
        setActivePanel(panel);
      } else {
        if (isValidatedPanel(activePanel)) {
          setExpanded(isExpanded ? panel : false);
          setActivePanel(panel);

        }
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("jsondata", JSON.stringify(values));
    if(files!==null){
      files.forEach(x=>formData.append("files",x.uploaded_file));
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(Constants.REGISTRAZIONE_UTENTE, formData,config)
      .then(response => {
        console.log(response)
        if((eventid !=='') && (eventid !== undefined)){
        const urlCandidatura=Constants.REGISTRAZIONE_CANDIDATURA.replace("eventid",eventid).replace("userid",response.data.id)  
        axios.get(urlCandidatura).then(response=>{console.log(response);
          handleOpen(response.data.message);}).catch(error=>{console.log(error)})
        }else{
          handleOpen(response.data.message);
        }
      })
      .catch(error => { console.error(error) })
      resetForm()
      setExistingUser(true)
      setFiles([])
  }

  const [existingUser,setExistingUser]=React.useState(true);
  const CheckUserExistence=()=>{
    axios.get(Constants.REGISTRAZIONE_CHECK_UTENTE+"/"+values.codicefiscale)
    .then(response => {
      console.log(response);
      if(response.data.result===false)
        setExistingUser(false);
      else{
        let userid=response.data.result;
        if((eventid !=='') && (eventid !== undefined)){
          const urlCandidatura=Constants.REGISTRAZIONE_CANDIDATURA.replace("eventid",eventid).replace("userid",userid)  
          axios.get(urlCandidatura).then(response=>{console.log(response);
            handleOpen(response.data.message);;}).catch(error=>{console.log(error)})
          }else
            handleOpen("USER_EXISTS"); 
      }
      
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

  return (<>
    {existingUser === true ?
      <Box
      mt={2}
      sx={{
        width: '100%',
      }}
      className={classes.root}
    > 

<Box mt={5} sx={{
display: 'flex',
flexWrap: 'no-wrap',
justifyContent: 'space-around',
alignItems:'center'
}}>
  
<Controls.Input name="codicefiscale" label="Codice Fiscale" type="text" value={values.codicefiscale} required={true} onChange={handleInputChange} sx={{minWidth:'70%'}} error={errors.codicefiscale} />

<Box>
<Controls.Button disabled={values.codicefiscale.length===0}text="Invia" onClick={CheckUserExistence}/>
</Box>
</Box>

<Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex',justifyContent: "space-around"}}>
               {(alertConf==='USER_SUCCESS' || alertConf==='PROPOSAL_SUCCESS')?<CheckCircleOutlineIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}}/>:<WarningAmberIcon sx={{fill:'rgb(162, 146, 86)',width:'3em', height:'3em'}} />}
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
:
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        style={{

          marginTop:"5px"
        }}
      >
 
        <Box
          mt={2}
          sx={{
            width:'100%'
          }}
        >
          {/* ====================STEP 1================================= */}
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Dati anagrafici
              </Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Grid container>
                <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Input name="nome" label="Nome" type="text" value={values.nome} required={true} onChange={handleInputChange} error={errors.nome} />
                  <Controls.Input name="cognome" label="Cognome" type="text" value={values.cognome} required={true} onChange={handleInputChange} error={errors.cognome} />
                  <Controls.Input name="mail" label="Mail" type="email" value={values.mail} required={true} onChange={handleInputChange} error={errors.mail} />
                  <Controls.Input name="telefono" label="Telefono" type="tel" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={values.telefono} required={false} onChange={handleInputChange} error={errors.telefono} />
                  <Controls.Input name="indirizzodomicilio" label="Indirizzo Domicilio" type="text" value={values.indirizzodomicilio} required={true} onChange={handleInputChange} error={errors.indirizzodomicilio} />
                  <Controls.Select
                    name="citta"
                    label={values.provincia === ''? "Selezionare prima la provincia":"Città*"}
                    disabled={values.provincia === ''}
                    value={values.citta}
                    onChange={handleInputChange}
                    options={citta.filter(x => x.provincia === values.provincia)}
                    error={errors.citta}
                  />
                  <Controls.Select
                    name="nazionedinascita"
                    label="Nazione di nascita*"
                    value={values.nazionedinascita}
                    onChange={handleInputChange}
                    options={nations}
                    error={errors.nazionedinascita}
                  />
                  {values.nazionedinascita.toUpperCase()!=='ITALIA' ?
                  <Controls.Input name="cittadinascita" label="Città di nascita" value={values.cittadinascita} required={true} onChange={handleInputChange} error={errors.cittadinascita} />
                  :                  <Controls.Select
                  name="cittadinascita"
                  label={values.provinciadinascita === ''? "Selezionare prima la provincia di nascita":"Città di nascita*"}
                  disabled={values.provinciadinascita === ''}
                  value={values.cittadinascita}
                  onChange={handleInputChange}
                  options={citta.filter(x => x.provincia === values.provinciadinascita)}
                  error={errors.cittadinascita}
                />}
                  <Controls.DatePicker
                    name="datadinascita"
                    label="Data di nascita"
                    value={values.datadinascita}
                    onChange={handleInputChange}
                    error={errors.datadinascita}
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}} >
                  <Controls.Input name="secondoNome" label="Secondo Nome" type="text" value={values.secondoNome} required={false} onChange={handleInputChange} />
                  <Controls.Select
                    name="genere"
                    label="Genere*"
                    value={values.genere}
                    onChange={handleInputChange}
                    options={genderItems}
                    error={errors.genere}
                  />
                  <Controls.Input name="cellulare" label="Cellulare" type="tel" value={values.cellulare} required={true} onChange={handleInputChange} error={errors.cellulare} />
                  <Controls.Input name="codicefiscale" label="Codice Fiscale" type="text" value={values.codicefiscale} required={true} onChange={handleInputChange} error={errors.codicefiscale} />
                  <Controls.Select
                    name="provincia"
                    label="Provincia*"
                    value={values.provincia}
                    onChange={handleInputChange}
                    options={provincie}
                    error={errors.provincia}
                  />
                  <Controls.Input name="cap" label="C.A.P." type="text" value={values.cap} required={true} onChange={handleInputChange} error={errors.cap}/>
                   {values.nazionedinascita.toUpperCase()!=='ITALIA' ?
                  <Controls.Input name="provinciadinascita" label="Provincia di nascita" value={values.provinciadinascita} required={true} onChange={handleInputChange} error={errors.provinciadinascita} />
                  :  <Controls.Select
                  name="provinciadinascita"
                  label="Provincia di nascita*"
                  value={values.provinciadinascita}
                  onChange={handleInputChange}
                  options={provincie}
                  error={errors.provinciadinascita}
                />}
                  
                  <Controls.Input name="note" label="Note" value={values.note} required={false} onChange={handleInputChange} />

                </Grid>
              </Grid>

            </AccordionDetails>
          </Accordion>

          {/* ====================STEP 2================================= */}
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5"> Dettagli personali</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={4} sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Input name="titolodistudi" label="Titolo di studi" type="text" value={values.titolodistudi} required={true} onChange={handleInputChange} error={errors.titolodistudi} />
	
                  <Controls.Input name="istituto" label="Istituto" type="text" value={values.istituto} required={true} onChange={handleInputChange} error={errors.istituto} />
                </Grid>
                <Grid item xs={4}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Input name="annodiconseguimento" label="Anno di conseguimento" type="number" value={values.annodiconseguimento} required={true} onChange={handleInputChange} error={errors.annodiconseguimento} />
                  <Controls.Input name="votazione" label="Votazione" type="number" value={values.votazione} required={true} onChange={handleInputChange} error={errors.votazione} />
                </Grid>
                <Grid item xs={4}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Input name="notepersonali" label="Note" type="text" value={values.notepersonali} required={false} onChange={handleInputChange} error={errors.notepersonali} />

                </Grid>

              </Grid>
              <Typography variant="h6" align="center" >
                Conoscenza delle lingue
              </Typography>
              <Grid container>
                <Grid item xs={4}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Select
                    name="inglese"
                    label="Inglese*"
                    value={values.inglese}
                    onChange={handleInputChange}
                    options={levels}
                    error={errors.inglese}
                  />
                  <Controls.Select
                    name="spagnola"
                    label="Spagnola"
                    value={values.spagnola}
                    onChange={handleInputChange}
                    options={levels}
                    error={errors.spagnola}
                  />
                </Grid>
                <Grid item xs={4}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Select
                    name="francese"
                    label="Francese"
                    value={values.francese}
                    onChange={handleInputChange}
                    options={levels}
                    error={errors.francese}
                  />
                  <Controls.Input name="altrelingue" label="Altre Lingue" value={values.altrelingue} required={false} onChange={handleInputChange} />

                </Grid>
                <Grid item xs={4}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Select
                    name="tedesca"
                    label="Tedesca"
                    value={values.tedesca}
                    onChange={handleInputChange}
                    options={levels}
                    error={errors.tedesca}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" align="center" >
                Social link
              </Typography>
              <Grid container sx={{marginLeft:'40px'}}>
                <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'}}>
      <FacebookIcon/> <Controls.Input name="fblink" label="Facebook" value={values.fblink} required={false} onChange={handleInputChange} />

      </Grid>
      <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'}}>
          <InstagramIcon/> <Controls.Input name="instalink" label="Instagram" value={values.instalink} required={false} onChange={handleInputChange} />

      </Grid>

      </Grid>
            </AccordionDetails>
          </Accordion>
          {/* ====================STEP 3================================= */}
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
              Patenti e corsi
              </Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Grid container>
                <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                <Controls.Checkbox
                name="haccp"
                label="HACCP"
                value={values.haccp}
                onChange={handleInputChange}
              />
                            <Controls.Checkbox
                name="tesserinoaeroporto"
                label="Tesserino per ingresso area sterile Aeroporto"
                value={values.tesserinoaeroporto}
                onChange={handleInputChange}
              />
              
              <Controls.Checkbox
                name="brevetto"
                label="Brevetto assistente ai bagnanti"
                value={values.brevetto}
                onChange={handleInputChange}
              />
                                          <Controls.Checkbox
                name="antincendio"
                label="Antincendio"
                value={values.antincendio}
                onChange={handleInputChange}
              />
                  </Grid>
                  <Grid item xs={6}  sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                  <Controls.Checkbox
                name="primosoccorso"
                label="Primo Soccorso"
                value={values.primosoccorso}
                onChange={handleInputChange}
              />
                   {/*}         <Controls.Checkbox
                name="tesserinoaeroporto"
                label="Tesserino per ingresso area sterile Aeroporto"
                value={values.tesserinoaeroporto}
                onChange={handleInputChange}
              />*/}
                            <Controls.Checkbox
                name="tesserinosicurezza"
                label="Tesserino addetto Sicurezza e Controllo"
                value={values.tesserinosicurezza}
                onChange={handleInputChange}
              />
                            <Controls.Checkbox
                name="patenteauto"
                label="Patente auto"
                value={values.patenteauto}
                onChange={handleInputChange}
              />

              <Controls.Checkbox
                name="automunito"
                label="AutoMunito"
                value={values.automunito}
                onChange={handleInputChange}
              />

                  </Grid>

              </Grid>

            </AccordionDetails>
          </Accordion>
          {/* ====================STEP 4================================= */}
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
                C.V. e foto
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6" align="center">
                Caricamento file
              </Typography>
              <Grid container>
              <Grid item xs={6} sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
                <Controls.FilePicker
                    name="filenameinputcv"
                    label={t('filenameinputcv')}
                    value={values.filenameinputcv}
                    onChange={handleInputChange}
                    callbackOnChange={updateUploadedFile}
                    maxSizeMb={0}
                    fileType="application/pdf"
                    error={errors.filenameinputcv}
               />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}> 
                <Controls.FilePicker
                    name="filenameinputprofiloimg"
                    label={t('filenameinputprofiloimg')}
                    value={values.filenameinputprofiloimg}
                    onChange={handleInputChange}
                    callbackOnChange={updateUploadedFile}
                    maxSizeMb={0}
                    fileType="image/png, image/jpeg"
                    error={errors.filenameinputprofiloimg}
               />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Box mt={5} sx={{
            display: 'flex',
            flexWrap: 'no-wrap',
            justifyContent: 'center'
          }}>
            <Controls.Button
              disabled={isDisabledSubmit()}
              type="submit"
              text="Invia Candidatura" />
          </Box>
        </Box>

      </Box>
    </Form>
}
</>
  );
}
