import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const Android12Switch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    top: 5,
    left: 0,
    transform: 'translateX(5px)',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(33px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        '&::before': {
          opacity: 1,
        },
        '&::after': {
          opacity: 0,
        },
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 24,
    height: 24,
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    boxSizing: 'border-box',
    '&::before, &::after': {
      display: 'inline-block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 10,
      fontWeight: 700,
      transition: 'opacity 0.1s',
    },
    '&::before': {
      content: '"YES"',
      left: 10,
      opacity: 0,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    '&::after': {
      content: '"NO"',
      right: 12,
      opacity: 1,
      color: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
    },
  },
}));

// We use ...props to ensure 'checked' and 'onChange' are passed to the Switch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomizedSwitches(props:any) {
  return <Android12Switch {...props} />;
}