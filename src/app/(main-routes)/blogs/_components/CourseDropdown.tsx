import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps as MAccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import RocketIcon from '@/assets/icons/rocket-icon';
import ChevronUp from '@/assets/icons/chevron-up';
import { Box, useMediaQuery } from '@mui/material';
import { convertToRem } from '@/utils/convert-to-rem';
import Typography from '@/elements/Typography';
import CourseHorizontalList from './CourseHorizontalList';
import { IBlog } from '@/types/blog.type';

type AccordionSummaryProps = MAccordionSummaryProps & {
	expanded?: boolean;
};
const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))<AccordionProps>(({ theme, expanded }) => ({
	backgroundColor: expanded ? '#152C57' : theme.palette.main.gray80,
	backgroundImage: 'none',
	margin: '2.5rem 0',
	borderRadius: '0.5rem',
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
	'.MuiAccordionSummary-root': {
		backgroundColor: expanded ? '#152C57' : theme.palette.main.gray80,
		borderRadius: '0.5rem',
		paddingTop: '1.5rem',
		paddingLeft: '1.5rem',
		paddingRight: '1.5rem',
		paddingBottom: 0,
	},
	'.MuiCollapse-root': {
		backgroundColor: expanded ? '#152C57' : theme.palette.main.gray80,
		borderRadius: '0.5rem',
		paddingTop: 0,
		paddingLeft: '1.5rem',
		paddingRight: '1.5rem',
		paddingBottom: '1.5rem',
	},
	'.MuiAccordionDetails-root': {
		borderTop: '0',
		padding: 0,
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	alignItems: 'center',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		borderBottomWidth: 0,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type CourseDropdown = {
	data: IBlog[];
	handleBookmark: Function;
	fetchNextPage?: Function;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
};

export default function CourseDropdown({
	data,
	handleBookmark,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: CourseDropdown) {
	const [expanded, setExpanded] = React.useState<boolean>(true);
	const theme = useTheme();
	const handleChange = () => {
		setExpanded((prev) => !prev);
	};

	const mdUp = useMediaQuery('(min-width: 768px)');

	return (
		<Accordion expanded={expanded} onChange={handleChange}>
			<AccordionSummary
				aria-controls='panel1d-content'
				id='panel1d-header'
				sx={{}}
				expandIcon={
					<Box
						sx={{
							backgroundColor: theme.palette.main.gray60,
							width: convertToRem(24),
							height: convertToRem(24),
							borderRadius: convertToRem(250),
						}}>
						<ChevronUp stroke={theme.palette.main.white} />
					</Box>
				}>
				<Box display='flex' alignItems='center'>
					<RocketIcon />
					<Typography ml={2} cate='title_2_bold'>
						카드뉴스
					</Typography>
				</Box>
				{!expanded && mdUp && (
					<Typography mr={2} cate='subtitle_1'>
						펼쳐보기
					</Typography>
				)}
			</AccordionSummary>
			<AccordionDetails>
				<CourseHorizontalList
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					data={data}
					handleBookmark={handleBookmark}
					isFetchingNextPage={isFetchingNextPage}
				/>
			</AccordionDetails>
		</Accordion>
	);
}
