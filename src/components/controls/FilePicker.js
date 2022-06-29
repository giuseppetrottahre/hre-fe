import React from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles({
    root: {},

    uploadButton: {
        background: 'gray'
    },
    labelUpload: {
        marginLeft: '10px'
    }
});

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000; //1MB
const convertMBytesToBytes = (MBytes) => Math.round(MBytes * KILO_BYTES_PER_BYTE * KILO_BYTES_PER_BYTE);

function FilePicker(props) {
    const { t, i18n, ready } = useTranslation( 'translation',{ useSuspense:false});
    const { maxSizeMb=DEFAULT_MAX_FILE_SIZE_IN_BYTES,fileType, required, name, label, value, onChange, callbackOnChange } = props
    const classes = useStyles();
    const fileInput = useRef(null);
  //  const [fileName, setFileName] = useState("");
   

    function handleUpload(e) {
         if (e.target.files.length > 0){
            var sizeInByte=convertMBytesToBytes(maxSizeMb)
            if ((sizeInByte >0)&&(e.target.files[0].size > convertMBytesToBytes(maxSizeMb)))
                window.alert(i18n.t('errore_file_size'))
            else{
                    callbackOnChange(e.target)
                    onChange(convertToDefEventPara(name, e.target.files[0].name))
                    
                 }
                 e.target.value = null
                }
    }
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

                 
  return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '4px'}}>
        <Typography> {label} </Typography>   
        <div style={{ display: 'flex', alignItems: 'center',marginTop:'4px' }} key="file-picker-input">
            <Button className={classes.uploadButton}
                variant="contained"
                onClick={() =>fileInput.current && fileInput.current.click()}>
                <DescriptionOutlinedIcon />
            </Button>

            <input
                id="file-upload"
                ref={fileInput}
                required={required}
                type="file"
                name={name}
                accept={fileType}
                style={{ display: 'none', marginLeft: '40' }}
                onChange={(e) => {handleUpload(e)} }/><label htmlFor="file-upload"><div className={classes.labelUpload}>  {value}</div></label>
                            
        </div>
        </div>

    )

}


export default FilePicker;