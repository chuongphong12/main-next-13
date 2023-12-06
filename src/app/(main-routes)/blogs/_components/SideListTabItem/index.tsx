import { Tab as MTab, TabProps as MTabProps, styled } from '@mui/material';
import { convertToRem } from '@/utils/convert-to-rem';

const SideListTabItem = styled(MTab)<MTabProps>(({ theme }) => ({
	padding: '0.5rem 0.75rem',
	minHeight: 'unset',
	zIndex: 5,
	color: theme.palette.main.white,
	height: '100%',
	borderRadius: convertToRem(250),
	backgroundColor: theme.palette.main.gray60,
	border: '1px solid',
	borderColor: theme.palette.main.gray30,
	marginRight: '0.5rem',
	'&.Mui-selected': {
		backgroundColor: theme.palette.main.primary,
		borderColor: theme.palette.main.primary,
		color: theme.palette.main.white,
	},
}));

export default SideListTabItem;
