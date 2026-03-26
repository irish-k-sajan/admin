import { useState } from 'react';
import './AdminPage.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button, Card, Checkbox, Typography } from '@mui/material';

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1px', minWidth:'80%' }}>
                <ThemeProvider theme={theme}>
              <Checkbox checked={isEnabled}
                onChange={handleToggle}
              />
              </ThemeProvider>
              <p className='banner-content'>Check the box to turn access on or off for all MLOs.</p>
            </div>
            <div className="toggle-container">
              <ThemeProvider theme={theme}>
                {/* <CustomizedSwitches2 checked={isEnabled} onChange={handleToggle} /> */}
              </ThemeProvider>
            </div>
            <div style={{display:'block', paddingTop:'20px'}}>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" disableElevation><b>Submit</b></Button>
                </ThemeProvider>
            </div>
          </div>
        </Alert>
        
    </div>
    </Card>
  );
}
