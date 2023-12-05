import { Box, CheckboxProps, useTheme } from '@mui/material';
import React from 'react';
import { Checkbox as MCheckbox } from '@mui/material';
import FavoriteIcon from '../../assets/icons/favorite';
import FavoriteFilledIcon from '../../assets/icons/favorite-filled';
const FavCheckbox = ({ title, sx: customSx = {}, ...rest }: CheckboxProps) => {
	const theme = useTheme();
	let style = '';

	return (
		<>
			<MCheckbox
				className={style}
				checkedIcon={<FavoriteFilledIcon />}
				icon={<FavoriteIcon />}
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

export default FavCheckbox;
