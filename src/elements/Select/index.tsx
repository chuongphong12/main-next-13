import {
	Box,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select as MSelect,
	SelectProps,
	TextField,
	styled,
	useTheme,
	IconButton,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './Input.module.scss';
import { convertToRem } from '@/utils/convert-to-rem';
import ChevronDownSmIcon from '../../assets/icons/chevron-down-sm';
import ChevronDownIcon from '../../assets/icons/chevron-down';

const SelectStyled = styled(MSelect)<SelectProps>(({ theme, error }) => ({
	backgroundColor: theme.palette.main.gray90,
	height: convertToRem(56) + ' !important',
	color: theme.palette.main.gray30,
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
	border: '1px solid ' + (error ? theme.palette.main.danger : theme.palette.main.gray90),
	'.MuiInputBase-input': {
		zIndex: 100,
	},
	'.MuiSelect-icon': {
		top: 8,
	},
}));

const Select = (props: SelectProps) => {
	const theme = useTheme();
	return (
		<SelectStyled
			MenuProps={{
				PaperProps: {
					sx: {
						backgroundColor: theme.palette.main.gray70,
						backgroundImage: 'unset',
						'.Mui-selected': {
							backgroundColor: theme.palette.main.gray60,
						},
					},
				},
			}}
			IconComponent={({ ...propsData }) => (
				<Box
					{...propsData}
					sx={{ zIndex: 101, padding: convertToRem(8) }}
					alignItems={'center'}
					display={'flex'}
					justifyContent={'center'}>
					<ChevronDownIcon stroke={theme.palette.main.gray30} />
				</Box>
			)}
			{...props}>
			{props.children}
		</SelectStyled>
	);
};

export default Select;
