import { Box, BoxProps, Grid, styled, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import Link from 'next/link';
import {} from '@/services/user.service';
import { convertToRem } from '@/utils/convert-to-rem';

const Section = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	width: '100%',
	padding: '1rem',
	borderRadius: '1rem',
	display: 'flex',
	fieldset: {
		border: 0,
	},
}));

type UrlCategoryProps = {
	item: string;
};

const UrlCategory = ({ item }: UrlCategoryProps) => {
	const theme = useTheme();

	return (
        <Section>
			<Typography cate='body_2' width={convertToRem(100)} flexShrink={0}>
				관련기사
			</Typography>
			<Grid gap={1} ml={2} display='flex' flexWrap={'wrap'}>
				<Link href={item} target='_blank' legacyBehavior>
					<Typography
						cate='body_2'
						sx={{
							textDecoration: 'under',
							lineBreak: 'anywhere',
							cursor: 'pointer',
						}}
						color={theme.palette.main.primary_light}>
						{item}
					</Typography>
				</Link>
			</Grid>
		</Section>
    );
};

export default UrlCategory;
