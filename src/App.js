import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme , ThemeProvider } from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import Clienti from './pages/clienti';
import Header from './pages/header';
import Fornitori from './pages/fornitori';
import Candidati from './pages/candidati';
import Cancellazione from './pages/cancellazione';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './i18n';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';import Constants from './conf/constants';
import Controls from "./components/controls/Controls";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a29256",
      light: '#3c44b126'
    },
    secondary: {
      main: "#a2915e",
      light: '#6b6767'
    },
    background: {
      default: "white"   
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
        
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    width: '100%',
    backgroundColor:'white'
  }
})


export default function App() {
  const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});
  const classes = useStyles();
  const [alertConf,setAlertConf]=React.useState();
  const [openDialog,setOpenDialog]=React.useState(false);

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


const handleClose=()=>{
  setOpenDialog(false);
  setAlertConf();
  window.location.href="https://www.hr-executive.it";
}

  const [view, setView] = React.useState('home');
  React.useEffect(() => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const page=params["page"];
    const userid=params["ida"];
    const eventid=params["ide"];
    if(page !== undefined)
      setView(page);
     else if (userid !==undefined && eventid !== undefined){
      const urlCandidatura=Constants.REGISTRAZIONE_CANDIDATURA.replace("eventid",eventid).replace("userid",userid)
      axios.get(urlCandidatura)
      .then(response => {
        setAlertConf(response.data.message); 
        setOpenDialog(true);  
        setView('message');
      })
    }  
    else if (eventid !==undefined && userid===undefined){
      console.log("iscrizione e candidatura");
      setView('candidati');
    }else if(eventid ===undefined && userid===undefined){
      console.log("home default")
    }else{
      console.error("combinazione non prevista eventid:"+eventid+",userid:"+userid);
    }
  }, [])

 
  return (
    <ThemeProvider theme={theme}>
       <div className={classes.appMain}>
       <Header onChoose={setView} sx={{marginBottom:'2px'}}/>
      {view==='fornitori' &&
       <Fornitori/>
      }
      {view==='candidati' &&
       <Candidati/>
      }
      {view==='clienti' &&
       <Clienti/>
      }
      {view==='cancellazione'&&
       <Cancellazione/>
      }
      {view ==='message' &&
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
              </Dialog>      }
     </div>
      <CssBaseline />
    </ThemeProvider>
  );

  }  







