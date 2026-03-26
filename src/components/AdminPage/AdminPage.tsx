import { useState } from 'react';
import Switch from '@mui/material/Switch';
import './AdminPage.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Card, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // You can use a hex code
      main: 'rgb(62, 114, 21)',
      // OR use a built-in MUI color
      // main: orange[500], 
    },
  },
});
export default function AdminPage() {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(event.target.checked);
  };

  return (
    <Card variant="outlined" sx={{maxHeight: '30vh', margin: '100px', marginTop:'150px' }}>
        <Typography variant="h5" component="div" sx={{ padding: '16px' }}>Disable MLO Access</Typography>
    <div className="admin-page">
        <Alert className='banner' severity="warning">
          <AlertTitle><b>Warning</b></AlertTitle>
          <div className="alert-header">
            
            <p className='banner-content'>Use the toggle to turn access on or off for all MLOs.</p>
            <div className="toggle-container">
                {isEnabled ? <Typography variant="subtitle1" sx={{ color: 'rgb(62, 114, 21)', fontWeight: 'bold', marginRight: '8px' }}>Access Enabled</Typography> : <Typography variant="subtitle1" sx={{ color: 'rgb(190, 0, 0)', fontWeight: 'bold', marginRight: '8px' }}>Access Disabled</Typography>}
              <Switch
                checked={isEnabled}
                onChange={handleToggle}
                color="success"
                size="medium"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'rgb(62, 114, 21)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'rgb(62, 114, 21)',
                  },
                }}
              />
              <ThemeProvider theme={theme}>
                {/* <CustomizedSwitches2 checked={isEnabled} onChange={handleToggle} /> */}
            </ThemeProvider>
            </div>
          </div>
        </Alert>
        
    </div>
    </Card>
  );
}
