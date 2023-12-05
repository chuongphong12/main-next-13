import { Box, CircularProgress, useTheme } from '@mui/material';
import React from 'react';
import styles from './Checkbox.module.scss';
import { Checkbox as MCheckbox } from '@mui/material';
import { CheckboxProps } from './checkbox.type';
import CheckIcon from '../../assets/icons/check';
import CheckRoundIcon from '../../assets/icons/check-round';
import CheckFilledIcon from '../../assets/icons/check-filled';
import CheckRoundFilledIcon from '../../assets/icons/check-round-filled';
import Typography from '@/elements/Typography';
const Checkbox = ({
	title,
	sx: customSx = {},
	rounded = false,
	type: customType = 'default',
	label,
	...rest
}: CheckboxProps) => {
	const theme = useTheme();
	let style = '';

	return (
		<Box display={'flex'} alignItems='center'>
			<MCheckbox
				className={style}
				checkedIcon={
					customType === 'borderless' ? (
						<CheckIcon stroke={theme.palette.main.primary} />
					) : rounded ? (
						<CheckRoundFilledIcon />
					) : (
						<CheckFilledIcon />
					)
				}
				icon={
					customType === 'borderless' ? (
						<CheckIcon />
					) : rounded ? (
						<CheckRoundIcon />
					) : undefined
				}
				sx={{
					color: theme.palette.main.gray40,
					borderRadius: rounded ? '250rem' : '0.5rem',
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
			{!!label && (
				<Typography cate={'body_2'} color={theme.palette.main.white} ml={2}>
					{label}
				</Typography>
			)}
		</Box>
	);
};

export default Checkbox;
