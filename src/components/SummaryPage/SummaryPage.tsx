import React, { useState } from 'react';
import {
  Box, Typography, Button, Tabs, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Alert,
  IconButton, Popover
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ResultSidePanel from '../ResultSidePanel/ResultSidePanel';

const headerStyle = {
  fontSize: '0.65rem',
  fontWeight: 800,
  color: '#666',
  textTransform: 'uppercase',
  py: 2
};

// 1. DATA WITHOUT IDs
const loanData = [
  {
    loanNumber: 'MG000999999999',
    customerName: 'CLARK KENT',
    description: 'DEFAULT ASSIGNED - MG FREDDIE MAC',
    state: 'VA',
    balance: '$338,180.47',
    payment: '$2,425.39',
    rate: '7.125%',
    term: '26 years 10 months',
    ltv: '80%',
    products: [
      {
        scenarios: [
          {
            label: 'Borrower Paid',
            subDesc: 'AGENCY 20, 25 & 30 YR FRM - 30 YR',
            balance: '$338,180.47',
            payment: '$2,054.82',
            rate: '6.125%',
            apr: '6.298%',
            savings: '$370.57',
            totalInterest: '$34,000',
            ltv: '80%',
          },
          {
            label: 'Fee Rolled',
            subDesc: 'AGENCY 20, 25 & 30 YR FRM - 30 YR',
            balance: '$342,542.53',
            payment: '$2,081.32',
            rate: '6.125%',
            apr: '6.299%',
            savings: '$344.07',
            totalInterest: '$34,000',
            ltv: '80%',
          },
        ],
      },
    ],
  },
];

export default function ViableLoansScreen() {
  const [tabValue, setTabValue] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Visible, setVisible] = useState(false);
  const [VisibleSidePanel, setVisibleSidePanel] = useState(false);
  const [SidePanelIndex, setSidePanelIndex] = useState(0);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleVisible = () => setVisible(!Visible);
  const handleLoanNumberClick = (index: number) => () => {
    setVisibleSidePanel(!VisibleSidePanel);
    setSidePanelIndex(index);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '90%', p: 2, bgcolor: '#ebe9e9ff', minHeight: '80vh', mt: '100px', ml: '80px' }}>
         {VisibleSidePanel && (<ResultSidePanel data={loanData[SidePanelIndex]}/>)}
      
      <Alert severity="warning" variant="outlined" sx={{ mb: 2, bgcolor: '#fffcf5', color: '#856404' }}>
        <strong>INTERNAL USE ONLY</strong> — Do NOT use this information to quote interest rates...
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 18, mr: 1, cursor: 'pointer' }} />
          <Typography variant="h6" fontWeight="700">Viable Loans: (1)</Typography>
        </Box>
        <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderColor: '#ccc', color: '#333' }}>
          View Filter Summary
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 0, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Summary" sx={{ textTransform: 'none', fontWeight: 700 }} />
        <Tab label="Viable Loan" sx={{ textTransform: 'none', fontWeight: 700 }} />
      </Tabs>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead sx={{ bgcolor: '#fff' }}>
            <TableRow>
              <TableCell sx={headerStyle}>CURRENT LOAN</TableCell>
              <TableCell sx={headerStyle}>LOAN ACCOUNT NUMBER</TableCell>
              <TableCell sx={headerStyle}>CUSTOMER NAME</TableCell>
              <TableCell sx={headerStyle}>PRODUCT DESCRIPTION</TableCell>
              <TableCell sx={headerStyle}>PROPERTY STATE</TableCell>
              <TableCell sx={headerStyle}>LOAN BALANCE</TableCell>
              <TableCell sx={headerStyle}>P&I PAYMENT</TableCell>
              <TableCell sx={headerStyle}>INTEREST RATE</TableCell>
              <TableCell sx={headerStyle}>APR</TableCell>
              <TableCell sx={headerStyle}>TOTAL INTEREST COST</TableCell>
              <TableCell sx={headerStyle}>
               <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 0.5, // Controls the exact spacing between text and icon
      justifyContent: 'flex-start',
      width:'70px' // Prevents text from wrapping to the next line
    }}
  >
    LIFETIME INTEREST SAVINGS
    <IconButton 
      size="small" 
      sx={{ 
        p: 0, ml:0.5
      }} 
      onMouseEnter={handlePopoverOpen} 
      onMouseLeave={handlePopoverClose}
    >
      <InfoOutlinedIcon sx={{ fontSize: 14, color: 'red' }} />
    </IconButton>
  </Box>
                <Popover
                  sx={{ pointerEvents: 'none' }}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                >
                  <Box sx={{ p: 2, maxWidth: 300 }}>
                    <Typography sx={{ fontSize: '0.75rem' }}>
                      <b>Note:</b> This is an estimate and is subject to qualification based on Loan Program, Interest Rate, Term, Closing Costs and assumes the borrower will not pay off the mortgage early. All terms are subject to change. <span style={{color:"red", display:'block', paddingTop:"0.25rem"}}>FOR INTERNAL USE ONLY</span>
                    </Typography>
                  </Box>
                </Popover>
              </TableCell>
              <TableCell sx={headerStyle}>LTV</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loanData.map((loan, lIdx) => (
              <React.Fragment key={lIdx}>
                {/* 1. PARENT ROW */}
                <TableRow sx={{ bgcolor: '#fff' }}>
                  <TableCell sx={{ fontWeight: 800 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      Scenario
                      <IconButton onClick={handleVisible} size="small" sx={{ ml: 1 }}>
                        <ArrowBackIosNewIcon sx={{ 
                          fontSize: 12, 
                          transform: Visible ? 'rotate(90deg)' : 'rotate(-90deg)', 
                          transition: '0.2s' 
                        }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#1976d2', fontWeight: 600, cursor: 'pointer' }} onClick={handleLoanNumberClick(lIdx)}>
                    {loan.loanNumber}
                  </TableCell>
                  <TableCell>{loan.customerName}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{loan.description}</TableCell>
                  <TableCell>{loan.state}</TableCell>
                  <TableCell>{loan.balance}</TableCell>
                  <TableCell>{loan.payment}</TableCell>
                  <TableCell>{loan.rate}</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  {/* <TableCell sx={}}>{loan.term}</TableCell> */}
                  <TableCell>{loan.ltv}</TableCell>
                </TableRow>
                {/* 2. SCENARIO ROWS */}
                {Visible && loan.products.map((product, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                      <TableCell colSpan={12} sx={{ fontWeight: 800, py: 1 }}>Scenario {pIdx + 1}</TableCell>
                    </TableRow>
                    {product.scenarios.map((scen, sIdx) => (
                      <TableRow key={sIdx} sx={{ '&:hover': { bgcolor: '#fbfbfb' } }}>
                        <TableCell sx={{ pl: 4 }}>{scen.label}</TableCell>
                        <TableCell colSpan={2} /> 
                        <TableCell sx={{ fontSize: '0.7rem', color: '#666' }}>{scen.subDesc}</TableCell>
                        <TableCell />
                        <TableCell>{scen.balance}</TableCell>
                        <TableCell>{scen.payment}</TableCell>
                        <TableCell>{scen.rate}</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>{scen.apr}</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: 'center', color: '#1976d2' }}>{scen.totalInterest}</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>{scen.savings}</TableCell>
                        <TableCell>{scen.ltv}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}