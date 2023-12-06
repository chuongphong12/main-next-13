import { Box, BoxProps, styled, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import moment from 'moment';
import {} from '@/services/user.service';
import { IExperience } from '@/types/pool.type';

const Section = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	width: '100%',
	padding: '1rem',
	borderRadius: '1rem',
	fieldset: {
		border: 0,
	},
}));

type CareerItemProps = {
	item: IExperience;
};

const CareerItem = ({ item }: CareerItemProps) => {
	const theme = useTheme();

	return (
		<Section>
			<Typography cate='subtitle_1_semibold' mb={2}>
				{item.companyName}
			</Typography>
			<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }} mb={0.5}>
				근무 기간: {moment(item.startDateAt).format('YYYY.MM')} -{' '}
				{moment(item.endDateAt).format('YYYY.MM')} ({item.yearsOfExperience}년)
			</Typography>
			<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }}>
				담당 업무: {item.undertaking}
			</Typography>
		</Section>
	);
};

export default CareerItem;
