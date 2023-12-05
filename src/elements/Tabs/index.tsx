import { convertToRem } from '@/utils/convert-to-rem';
import {
	IconButton,
	Tabs as MTabs,
	TabsProps as MTabsProps,
	styled,
	useTheme,
} from '@mui/material';
import ChevronLeftIcon from '../../assets/icons/chevron-left';
import ChevronRightIcon from '../../assets/icons/chevron-right';
const TabsStyled = styled(MTabs)<MTabsProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray80,
	[theme.breakpoints.down('sm')]: {
		backgroundColor: 'transparent',
	},

	height: convertToRem(75) + ' !important',
	padding: '1rem',
	color: theme.palette.main.gray30,
	borderRadius: '0.5rem',
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
	'.MuiTabs-indicator': {
		height: '100%',
		borderRadius: convertToRem(250),
		backgroundColor: theme.palette.main.primary,
	},
	'.MuiInputBase-input': {
		zIndex: 100,
	},
	'.MuiTabs-flexContainer': {
		height: '100%',
	},
}));

const Tabs = (props: MTabsProps) => {
	const theme = useTheme();

	return (
		<TabsStyled
			{...props}
			ScrollButtonComponent={(props) => {
				if (props.direction === 'left' && !props.disabled) {
					return (
						<IconButton {...props}>
							<ChevronLeftIcon stroke={theme.palette.main.gray10} />
						</IconButton>
					);
				} else if (props.direction === 'right' && !props.disabled) {
					return (
						<IconButton {...props}>
							<ChevronRightIcon stroke={theme.palette.main.gray10} />
						</IconButton>
					);
				} else {
					return null;
				}
			}}>
			{props.children}
		</TabsStyled>
	);
};

export default Tabs;
