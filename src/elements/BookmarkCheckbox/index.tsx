import { CheckboxProps, Checkbox as MCheckbox, useTheme } from '@mui/material';
import BookmarkCheckIcon from '../../assets/icons/bookmark-check';
import BookmarkUncheckIcon from '../../assets/icons/bookmark-uncheck';
const BookmarkCheckbox = ({ title, sx: customSx = {}, ...rest }: CheckboxProps) => {
	const theme = useTheme();
	let style = '';

	return (
		<>
			<MCheckbox
				className={style}
				checkedIcon={<BookmarkCheckIcon stroke={theme.palette.main.primary_light} />}
				icon={<BookmarkUncheckIcon stroke={theme.palette.main.white} />}
				sx={{
					color: theme.palette.main.gray40,
					justifyContent: 'center',
					alignItems: 'center',
					fontWeight: '600',
					lineHeight: '120%',
					padding: '0',
					...customSx,
					width: 24,
					height: 24,
				}}
				{...rest}
			/>
		</>
	);
};

export default BookmarkCheckbox;
