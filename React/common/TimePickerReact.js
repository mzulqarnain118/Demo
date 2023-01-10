import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { makeStyles } from '@material-ui/core/styles';


export default function MuiTimePicker({label, value, onChange, ...props}) {
  
  const useStyles = makeStyles(() => ({
    container: {
      background: '#ffff',
  },
  }));
  const classes = useStyles();

  return (
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
          onChange={onChange}
          className={classes.container}
        renderInput={(params) => <TextField {...params} />}
        // sx={{ backgroundColor: "white" }}
      />
    </LocalizationProvider>
  );
}

//**TODO CALLING WAY*/
{/* <MuiTimePicker
value={updateModelTime}
onChange={(newValue) => {
  setupdateModelTime(new Date(newValue));
}}
/>   */}