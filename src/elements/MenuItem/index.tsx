import {
	Box,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	MenuItem as MMenuItem,
	MenuItemProps,
	TextField,
	styled,
	useTheme,
	IconButton,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './Input.module.scss';
import { convertToRem } from 'utils/convert-to-rem';
import ChevronDownSmIcon from '../../assets/icons/chevron-down-sm';
import ChevronDownIcon from '../../assets/icons/chevron-down';

const MenuItemStyled = styled(MMenuItem)<MenuItemProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray70,
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
}));

const MenuItem = (props: MenuItemProps) => {
	const theme = useTheme();
	return <MenuItemStyled {...props}>{props.children}</MenuItemStyled>;
};

export default MenuItem;
