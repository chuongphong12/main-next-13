import {
	Box,
	IconButton,
	InputAdornment,
	InputProps as MInputProps,
	OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import Visibility from '../../assets/icons/visibility';
import VisibilityOff from '../../assets/icons/visibilityOff';
import CustomFormControlLabel, {
	CustomFormControlLabelProps,
} from '@/elements/CustomFormControlLabel';
import styles from './Input.module.scss';
import { Theme, useTheme } from '@mui/material/styles';
import Typography from '@/elements/Typography';
import { convertToRem } from '@/utils/convert-to-rem';
import SearchIcon from '../../assets/icons/search';
import SearchFilledIcon from '../../assets/icons/search-filled';

export type InputSize = 'md' | 'lg';
export type InputCate = 'solid' | 'search';
export type InputStyles = {
	inputSize?: InputSize;
	inputCate?: InputCate;
};

export type AdditionalInputProps = Omit<MInputProps, 'error'> &
	InputStyles & {
		maxLength?: number;
		error?: FieldError;
		onSearch?: any;
	};

type InputProps = AdditionalInputProps;

const SearchInput = ({
	sx,
	error,
	disabled,
	type,
	id,
	className,
	defaultValue,
	onSearch,
	value: outSideValue,
	...rest
}: InputProps) => {
	const theme = useTheme();

	const [focused, setFocused] = useState<boolean>(false);
	const [value, setValue] = useState('');
	const searchHandle = () => {
		onSearch();
	};

	return (
		<OutlinedInput
			className={styles.custom_input}
			disabled={disabled}
			onFocus={() => {
				setFocused(true);
			}}
			onBlur={() => {
				setFocused(false);
			}}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			onKeyDown={(event) => {
				if (event.keyCode === 13 || event.keyCode === 176) {
					onSearch();
				}
			}}
			id={id}
			endAdornment={
				<InputAdornment className={styles.visibility} position='end'>
					<IconButton
						className={styles.visibility_btn}
						aria-label='toggle password visibility'
						onClick={searchHandle}
						sx={{
							padding: 0,
						}}>
						{focused || Boolean(value || outSideValue) ? (
							<SearchFilledIcon />
						) : (
							<SearchIcon />
						)}
					</IconButton>
				</InputAdornment>
			}
			sx={{
				height: convertToRem(44),
				border: '1px solid',
				boxShadow: 'none !important',
				outline: 'none !important',
				borderRadius: '250rem',
				transition: '0.3s',
				borderColor: theme.palette.main.gray50 + ' !important',
				padding: '0 4px 0 16px',
				background: 'transparent',
				color: Boolean(value) ? theme.palette.main.gray10 : theme.palette.main.gray40,
				fieldset: {
					border: 0,
				},
				'&.Mui-focused': {
					color: theme.palette.main.gray10 + ' !important',
				},
				...sx,
			}}
			{...rest}
		/>
	);
};

export default SearchInput;
