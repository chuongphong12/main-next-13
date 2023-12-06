import { Box, BoxProps, styled, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import moment from 'moment';
import {} from '@/services/user.service';
import { IEducation } from '@/types/pool.type';

const Section = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	width: '100%',
	padding: '1rem',
	borderRadius: '1rem',
	fieldset: {
		border: 0,
	},
}));

type EducationItemProps = {
	item: IEducation;
};

const EducationItem = ({ item }: EducationItemProps) => {
	const theme = useTheme();

	return (
		<Section>
			<Typography cate='subtitle_1_semibold' mb={2}>
				{item.schoolName} {item.majors}
			</Typography>
			<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }} mb={0.5}>
				{moment(item.startDateAt).format('YYYY.MM')} -{' '}
				{moment(item.endDateAt).format('YYYY.MM')}
			</Typography>
		</Section>
	);
};

export default EducationItem;
