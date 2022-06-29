import React from "react";
import { makeStyles } from '@mui/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { useTranslation } from 'react-i18next';
import '../i18n';
import imgPrcLogo from './logo-main.jpg';

const formsType=[{id:'candidati'},
                 {id:'fornitori'},
                 {id:'clienti'},
                 {id:'cancellazione'}]

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",

  },
  link: {
    textDecoration: "none",
   
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "black",
      borderBottom: "1px solid black",
    },
  },
}));

function Header({onChoose}) {
  const classes = useStyles();
  const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense: false });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item,event) => {
    onChoose(item.id);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"white"}}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
        <a href="https://www.hr-executive.it"> <img alt="HR-Executive" src={imgPrcLogo} /> </a><Typography style={{color:'#a2915b'}}></Typography>
        </Typography>
     <Button
        id="menu-positioned-button"
        aria-controls="menu-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="secondary"
        >
        { t('work_with_us') }
      </Button>
      <Menu
        id="positioned-menu"
        aria-labelledby="menu-positioned-button"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
                  {formsType.map(item => (
            <MenuItem key={item.id} onClick={(event) => handleClose(item, event)}>
              {t(item.id)}
            </MenuItem>
          ))}

      </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
