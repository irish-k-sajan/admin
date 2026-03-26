import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Popover,
  Box,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Scenario {
  label: string;
  subDesc: string;
  balance: string;
  payment: string;
  rate: string;
  apr: string;
  savings: string;
  totalInterest: string;
  ltv: string;
}

interface Product {
  scenarios: Scenario[];
}

interface ProductPanelProps {
  productOptions: Product[];
}

export const ProductPanel: React.FC<ProductPanelProps> = ({
  productOptions = [],
}) => {
  const allScenarios = productOptions.flatMap(product => product.scenarios || []);
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2, maxWidth: '70vw' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Scenario</strong></TableCell>
            <TableCell><strong>Product Description</strong></TableCell>
            <TableCell><strong>Current Balance</strong></TableCell>
            <TableCell><strong>Monthly Payment</strong></TableCell>
            <TableCell><strong>Interest Rate</strong></TableCell>
            <TableCell><strong>APR</strong></TableCell>
            {/* --- FIXED SECTION --- */}
            <TableCell>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                <strong>Lifetime Interest Savings</strong>
                <IconButton 
                  size="small" 
                  sx={{ p: 0, ml: 0.5 }} 
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Box sx={{ p: 2, maxWidth: 300 }}>
                  <Typography sx={{ fontSize: '0.75rem' }}>
                    <b>Note:</b> This is an estimate and is subject to qualification based on Loan Program, Interest Rate, Term, Closing Costs and assumes the borrower will not pay off the mortgage early. 
                    <span style={{ color: "red", display: 'block', paddingTop: "0.25rem", fontWeight: 'bold' }}>
                      FOR INTERNAL USE ONLY
                    </span>
                  </Typography>
                </Box>
              </Popover>
            </TableCell>
            {/* --- END FIXED SECTION --- */}
            <TableCell><strong>Total Interest Paid</strong></TableCell>
            <TableCell><strong>LTV</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allScenarios.map((scen, index) => (
            <TableRow key={index} sx={{ '&:hover': { bgcolor: '#fbfbfb' } }}>
              <TableCell>{scen.label}</TableCell>
              <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                {scen.subDesc || '-'}
              </TableCell>
              <TableCell>{scen.balance}</TableCell>
              <TableCell>{scen.payment}</TableCell>
              <TableCell>{scen.rate}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{scen.apr}</TableCell>
              <TableCell>{scen.savings}</TableCell>
              <TableCell>{scen.totalInterest}</TableCell>
              <TableCell>{scen.ltv}</TableCell>
            </TableRow>
          ))}
          {allScenarios.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                No scenarios available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};