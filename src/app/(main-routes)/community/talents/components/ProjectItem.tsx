import { Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import moment from 'moment';
import Link from 'next/link';
import {} from '@/services/user.service';
import { IProject } from '@/types/pool.type';

const Section = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	width: '100%',
	padding: '1rem',
	borderRadius: '1rem',
	fieldset: {
		border: 0,
	},
}));

type ProjectItemProps = {
	item: IProject;
};

const ProjectItem = ({ item }: ProjectItemProps) => {
	const theme = useTheme();
	const mdUp = useMediaQuery('(min-width: 768px)');
	return (
        <Section>
			<Box
				display={'flex'}
				alignItems={mdUp ? 'center' : 'flex-start'}
				mb={2}
				flexDirection={mdUp ? 'row' : 'column'}>
				<Typography cate='subtitle_1'>{item.projectName}</Typography>
				<Typography cate='caption_1' ml={mdUp ? 2 : 0}>
					{moment(item.startDateAt).format('YYYY.MM')} -{' '}
					{moment(item.endDateAt).format('YYYY.MM')} / {item.projectOwner}
				</Typography>
			</Box>
			<Typography cate='caption_1' mb={2} whiteSpace={'pre-line'}>
				{item.description}
			</Typography>
			{!!item.relatedLink && (
				<Box
					display={'flex'}
					alignItems={mdUp ? 'center' : 'flex-start'}
					mb={2}
					flexDirection={mdUp ? 'row' : 'column'}>
					<Typography cate='caption_2' flexShrink={0}>
						관련 링크
					</Typography>
					<Link href={item.relatedLink} legacyBehavior>
						<Typography
							cate='caption_2'
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '100%',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical',
							}}
							ml={mdUp ? 0.5 : 0}
							color={theme.palette.main.primary_light}>
							{item.relatedLink}
						</Typography>
					</Link>
				</Box>
			)}
		</Section>
    );
};

export default ProjectItem;
