import Typography from '@/elements/Typography';
import { Box, useTheme } from '@mui/material';

export const BlogInfo = ({ content, tags }: { content: string; tags: any[] }) => {
	const theme = useTheme();
	return (
		<Box mt={3}>
			<Typography color={theme.palette.main.primary_light}>
				{tags.map((t) => '#' + t.name + ' ')}
			</Typography>
			<Box
				sx={{
					marginTop: '5rem',
					img: {
						maxWidth: '100%',
					},
				}}
				component='div'
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</Box>
	);
};
