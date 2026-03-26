import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  Tabs, 
  Tab, 
  Divider, 
  IconButton,
  List,
  ListItem,
  Popover,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import './ResultSidePanel.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ProductPanel } from '../ProductPanel/ProductPanel';

const LoanDetailsPanel = ({data}) => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: { currentTarget: React.SetStateAction<null>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const loanData = [
    { label: "Borrower 2 Name", value: data.customerName || "-",pop:false },
    { label: "Property Address (City)", value: "-",pop:false },
    { label: "Property Address (State)", value: data.state || "-",pop:false },
    { label: "Property Address (Zip Code)", value: "-",pop:false },
    { label: "Property Address (County)", value: "-",pop:false },
    // {label:"LifeTime Interest Savings", value:"$24,000", pop:true},
    // {label: "Total Interest Paid", value: "$1,174.40", pop:false},
    { label: "Regions Originated", value: "-",pop:false },
    { label: "RM Name", value: "-",pop:false },
    { label: "PM Name", value: "-",pop:false },
    { label: "Assigned MLO", value: "-",pop:false },
    { label: "Property Type", value: "-",pop:false },
    { label: "Loan Type", value: "-",pop:false },
    { label: "Loan Rate Type", value: "-",pop:false },
    { label: "Product Description", value: data.description || "-",pop:false },
    { label: "Principal & Interest Payment (P&I)", value: data.payment || "-",pop:false },
    { label: "Total Escrow Payment", value: data.escrowPayment || "-",pop:false },
    { label: "Mortgage Insurance (MI) Amount", value: data.miAmount || "-",pop:false },
    { label: "Original Interest Rate", value: data.originalRate || "-",pop:false },
    { label: "Original Loan Balance", value: data.originalBalance || "-",pop:false },
    { label: "Original Loan Term (Months)", value: "360",pop:false },
    { label: "Occupancy", value: "PRIMARY RESIDENCE",pop:false },
  ];

  return (
    <Box className="result-side-panel">
      
      {/* Header */}
      <Box className="panel-header">
        <IconButton size="small"><ArrowBackIosNewIcon sx={{ fontSize: 16 }} /></IconButton>
        <Typography variant="subtitle2" className="panel-header title">
          {data.loanNumber} - Loan Details
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Box className="panel-tabs">
        <Tabs 
          value={tabValue} 
          onChange={(_, v) => setTabValue(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 40, '& .MuiTab-root': { fontSize: '0.75rem', py: 1, fontWeight: 600 } }}
        >
          <Tab label="Customer Details" />
          <Tab label="Product Options" />
        </Tabs>
      </Box>

      {/* Profile Section */}
      {(tabValue === 0) ? (
        <>
      <Box className="profile-section">
        <Box className="profile-info">
          <Avatar className="profile-avatar">
            <PersonIcon className="profile-avatar-icon" />
          </Avatar>
          <Box className="profile-text">
            <Typography variant="h6">{data.customerName || "-"}</Typography>
            <Typography variant="caption">Email: -</Typography>
          </Box>
        </Box>
        <Chip label="Active" color="success" size="small" className="status-chip" />
      </Box>
      {/* Summary Grid */}
      <Box className="summary-grid">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
          {[
            { l: "Loan Account Number", v: data.loanNumber || "-" },
            { l: "Customer Id", v: data.customerId || "-" },
            { l: "Product Type", v: data.productType || "-" },
            { l: "Origination Date", v: data.originationDate || "-" },
            { l: "Loan Term", v: data.term || "-" },
            { l: "Investor", v: data.investor || "-" }
          ].map((item, i) => (
            <Box key={i} className="summary-grid-item">
              <Typography className="summary-label">{item.l}</Typography>
              <Typography className="summary-value"><b>{item.v}</b></Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Detailed Data List */}
      <List className="data-list">
        {loanData.map((row, index) => (
          <React.Fragment key={index}>
           {/* Inside your loanData.map loop */}
<ListItem className="data-list-item">
  {/* Left Side: Label + Icon */}
  <Box className="data-label-container">
    <Typography className="data-label">
      {row.label}
    </Typography>
    
    {row.pop && (
      <>
        <IconButton
          size="small"
          sx={{ p: 0, ml: 0.5, color: 'action.active' }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <InfoOutlinedIcon sx={{ fontSize: 16 ,color:'red'}} />
        </IconButton>
        <Popover
          sx={{ pointerEvents: 'none' }}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          disableRestoreFocus
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box sx={{ p: 2, maxWidth: 350 }}>
            <Typography sx={{ fontSize: '0.8rem' }}>
              <b>Note:</b> This is an estimate and is subject to qualification based on Loan Program, Interest Rate, Term, Closing Costs and assumes the borrower will not pay off the mortgage early. All terms are subject to change. <span style={{color:"red", display:'block', paddingTop:"0.25rem"}}>FOR INTERNAL USE ONLY</span>
            </Typography>
          </Box>
        </Popover>
      </>
    )}
  </Box>

  {/* Right Side: Value */}
  <Typography className="data-value">
    <b>{row.value}</b>
  </Typography>
</ListItem>
            <Divider className="data-divider" component="li" />
          </React.Fragment>
        ))}
      </List>
      </>) : (<ProductPanel productOptions={data.products} />)}
    </Box>
    
  );
};

export default LoanDetailsPanel;