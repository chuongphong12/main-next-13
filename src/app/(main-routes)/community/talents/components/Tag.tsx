import {
	Box,
	CardActionArea,
	styled,
	useMediaQuery,
	useTheme,
	ChipProps,
	Chip as MChip,
	Avatar,
	IconButton,
} from '@mui/material';
import { convertToRem } from '@/utils/convert-to-rem';

const Tag = styled(MChip)<ChipProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.primary,
	padding: '0.5rem 1rem',
	color: theme.palette.main.white,
	borderRadius: convertToRem(250),
	fontSize: convertToRem(12),
	'.MuiChip-label': {
		padding: 0,
	},
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
}));

export default Tag;
