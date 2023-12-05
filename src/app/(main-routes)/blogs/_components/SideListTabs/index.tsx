import {
  Box,
  IconButton,
  Tabs as MTabs,
  TabsProps as MTabsProps,
  styled,
  useTheme,
} from '@mui/material';
import ChevronLeftSmIcon from 'assets/icons/chevron-left-sm';
import ChevronRightSmIcon from 'assets/icons/chevron-right-sm';
import { convertToRem } from 'utils/convert-to-rem';
const TabsStyled = styled(MTabs)<MTabsProps>(({ theme }) => ({
  backgroundColor: 'transparent',
  height: convertToRem(33) + ' !important',
  padding: '0',
  color: theme.palette.main.gray30,
  borderRadius: '0',
  position: 'relative',
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70,
  },
  '.MuiIconButton-root': {
    position: 'absolute',
    zIndex: 8,
    top: '30%',
  },
  '.MuiTabs-indicator': {
    display: 'none',
  },
  '.MuiInputBase-input': {
    zIndex: 100,
  },
  '.MuiTabs-flexContainer': {
    height: '100%',
  },
}));

const SideListTabs = (props: MTabsProps) => {
  const theme = useTheme();

  return (
    <TabsStyled
      {...props}
      ScrollButtonComponent={(props) => {
        if (props.direction === 'left' && !props.disabled) {
          return (
            <Box
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.main.gray90} 0%, ${theme.palette.main.gray90} 65%, rgba(0,212,255,0) 100%)`,
                left: 0,
                width: '2.5rem',
                position: 'absolute',
                height: '100%',
                zIndex: 7,
              }}
            >
              <IconButton
                {...props}
                sx={{
                  backgroundColor: theme.palette.main.gray60,
                  width: '1.5rem',
                  height: '1.5rem',
                }}
              >
                <ChevronLeftSmIcon
                  marginLeft={-8}
                  stroke={theme.palette.main.gray10}
                />
              </IconButton>
            </Box>
          );
        } else if (props.direction === 'right' && !props.disabled) {
          return (
            <Box
              sx={{
                background: `linear-gradient(90deg, rgba(0,212,255,0) 0%, ${theme.palette.main.gray90} 30%, ${theme.palette.main.gray90} 100%)`,
                right: 0,
                width: '2.5rem',
                position: 'absolute',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 7,
              }}
            >
              <IconButton
                {...props}
                sx={{
                  backgroundColor: theme.palette.main.gray60,
                  width: '1.5rem',
                  height: '1.5rem',
                }}
              >
                <ChevronRightSmIcon stroke={theme.palette.main.gray10} />
              </IconButton>
            </Box>
          );
        } else {
          return null;
        }
      }}
    >
      {props.children}
    </TabsStyled>
  );
};

export default SideListTabs;
