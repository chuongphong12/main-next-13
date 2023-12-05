import { Box, GridProps, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';

type EducationItemCustom = GridProps & {
	title?: string;
	period?: string;
};

const EducationItem = ({ title, period }: EducationItemCustom) => {
	const theme = useTheme();
	const mdDown = useMediaQuery('(max-width: 768px)');
	return (
		<Box
			display={'flex'}
			alignItems={mdDown ? 'flex-start' : 'center'}
			justifyContent={mdDown ? 'flex-start' : 'space-between'}
			flexDirection={mdDown ? 'column' : 'row'}
			py={2}>
			<Typography cate='body_2' color={theme.palette.main.gray10}>
				{title}
			</Typography>
			<Typography cate='caption_1' color={theme.palette.main.gray10}>
				{period}
			</Typography>
		</Box>
	);
};
export default EducationItem;
