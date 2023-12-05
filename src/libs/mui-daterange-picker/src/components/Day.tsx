import React from 'react';
import { IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import Typography from '@/elements/Typography';

interface DayProps {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	disabled?: boolean;
	startOfRange?: boolean;
	isStartOfWeek?: boolean;
	isEndOfWeek?: boolean;
	endOfRange?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const Day: React.FunctionComponent<DayProps> = ({
	startOfRange,
	endOfRange,
	disabled,
	highlighted,
	outlined,
	isStartOfWeek,
	isEndOfWeek,
	filled,
	onClick,
	onHover,
	value,
}: DayProps) => {
	const theme = useTheme();
	const smDown = useMediaQuery('(max-width: 576px)');

	return (
		<Box
			sx={{
				display: 'flex',
				// eslint-disable-next-line no-nested-ternary
				borderRadius:
					startOfRange || isStartOfWeek
						? '50% 0 0 50%'
						: endOfRange || isEndOfWeek
						? '0 50% 50% 0'
						: undefined,
				backgroundColor: (theme) => (highlighted ? theme.palette.main.gray80 : undefined),
			}}>
			<IconButton
				sx={{
					height: smDown ? '35px' : '55px',
					width: smDown ? '35px' : '55px',
					padding: 0,
					border: (theme) => (!disabled && outlined ? `1px solid #E1E2E5` : undefined),
					...(!disabled && filled
						? {
								'&:hover': {
									backgroundColor: theme.palette.main.primary,
								},
								backgroundColor: theme.palette.main.primary,
						  }
						: {}),
				}}
				disabled={disabled}
				onClick={onClick}
				onMouseOver={onHover}
				// size="large"
			>
				<Typography
					color={
						!disabled
							? isEndOfWeek
								? theme.palette.main.primary_light
								: isStartOfWeek
								? theme.palette.main.danger
								: theme.palette.main.gray10
							: isEndOfWeek
							? 'rgba(114, 154, 254, 0.5)'
							: isStartOfWeek
							? 'rgba(239, 43, 42, 0.5)'
							: theme.palette.main.gray30
					}
					cate='body_3'>
					{value}
				</Typography>
			</IconButton>
		</Box>
	);
};

export default Day;
