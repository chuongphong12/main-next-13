import { Tab as MTab, TabProps as MTabProps, styled } from '@mui/material';

const Tab = styled(MTab)<MTabProps>(({ theme }) => ({
  padding: '0.5rem 2rem',
  minHeight: 'unset',
  height: '100%',
  zIndex: 5,
  borderRadius: '500px',
  color: theme.palette.main.white,
  [theme.breakpoints.down('sm')]: {
    border: '1px solid ' + theme.palette.main.gray50,
    marginRight: '0.5rem',
  },
  '&.Mui-selected': {
    color: theme.palette.main.white,
    [theme.breakpoints.down('sm')]: {
      border: '1px solid ' + theme.palette.main.primary,
      borderRadius: '500px',
    },
  },
}));

export default Tab;
