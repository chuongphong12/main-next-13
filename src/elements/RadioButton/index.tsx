import { useTheme } from '@mui/material';
import React from 'react';
import { Radio as MRadio } from '@mui/material';
import RadioFilledIcon from '../../assets/icons/radio-filled';
import RadioIcon from '../../assets/icons/radio';
const Radio = ({ title, sx: customSx = {}, ...rest }: any) => {
	const theme = useTheme();
	let style = '';

	return (
		<>
			<MRadio
				className={style}
				checkedIcon={<RadioFilledIcon />}
				icon={<RadioIcon />}
				sx={{
					color: theme.palette.main.gray40,
					justifyContent: 'center',
					alignItems: 'center',
					fontWeight: '600',
					lineHeight: '120%',
					padding: '0',
					...customSx,
					width: 20,
					height: 20,
				}}
				{...rest}
			/>
		</>
	);
};

export default Radio;
