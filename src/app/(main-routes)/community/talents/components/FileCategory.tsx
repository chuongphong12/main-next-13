import { Box, BoxProps, Grid, styled, useTheme } from '@mui/material';
import Typography from '@/elements/Typography';
import {} from '@/services/user.service';
import { IFile } from '@/types/user.type';
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

type FileCategoryProps = {
	item: IFile;
};

const FileCategory = ({ item }: FileCategoryProps) => {
	const theme = useTheme();

	return (
		<Section>
			<Typography cate='body_2' width={convertToRem(100)} sx={{ flexShrink: 0 }}>
				포트폴리오
			</Typography>
			<Typography
				cate='body_2'
				sx={{ lineBreak: 'anywhere', cursor: 'pointer' }}
				onClick={() => {
					window.open(item.url);
				}}
				ml={2}>
				{item.name}
			</Typography>
		</Section>
	);
};

export default FileCategory;
