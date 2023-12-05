import { Box, BoxProps, Chip, styled, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import moment from 'moment';
import {} from '@/services/user.service';
import { IExperience } from '@/types/pool.type';

const Section = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	width: '100%',
	padding: '1rem',
	[theme.breakpoints.down('md')]: {
		backgroundColor: theme.palette.main.gray80,
		padding: '0',
	},
	borderRadius: '1rem',
	fieldset: {
		border: 0,
	},
}));

const CareerItemProfile = ({ item }: { item: IExperience }) => {
	const theme = useTheme();
	const lgDown = useMediaQuery('(max-width: 992px)');

	return (
		<Section>
			<Box
				display={'flex'}
				justifyContent='space-between'
				alignItems={lgDown ? 'flex-start' : 'center'}
				flexDirection={lgDown ? 'column' : 'row'}
				mb={2}>
				<Typography cate='subtitle_1_semibold' mb={lgDown ? 1 : 0}>
					{item.companyName}
				</Typography>
				<Box display={'flex'} alignItems={'center'}>
					{item.isCurrentlyWorking && (
						<Chip
							label={'재직중'}
							sx={{
								fontSize: '0.875rem',
								color: theme.palette.main.orange,
								fontFamily: 'Pretendard',
								padding: '0.31rem 0.75rem',
								background: 'rgba(236, 74, 10, 0.1)',
								border: '1px solid ' + theme.palette.main.orange,
								borderRadius: '250rem',
							}}
						/>
					)}
				</Box>
			</Box>
			<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }} mb={0.5}>
				근무 기간: {moment(item.startDateAt).format('YYYY.MM.DD')} -{' '}
				{moment(item.endDateAt).format('YYYY.MM.DD')} ({item.yearsOfExperience}
				년)
			</Typography>
			<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }}>
				담당 업무: {item.undertaking}
			</Typography>
		</Section>
	);
};

export default CareerItemProfile;
