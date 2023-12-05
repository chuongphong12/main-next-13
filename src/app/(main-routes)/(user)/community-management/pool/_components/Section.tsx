import Typography from '@/elements/Typography';
import { Box, GridProps, useMediaQuery } from '@mui/material';

type SectionCustom = GridProps & {
	title: string;
};

const Section = ({ title, children }: SectionCustom) => {
	const mdDown = useMediaQuery('(max-width: 768px)');

	return (
		<Box>
			<Typography cate={mdDown ? 'body_2_semibold' : 'subtitle_1_semibold'} mb={2}>
				{title}
			</Typography>
			{children}
		</Box>
	);
};
export default Section;
