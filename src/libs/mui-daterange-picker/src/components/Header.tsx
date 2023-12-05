import { Grid, IconButton, SelectChangeEvent, useTheme } from '@mui/material';
import ChevronLeftIcon from '../../../../assets/icons/chevron-left';
import ChevronRightIcon from '../../../../assets/icons/chevron-right';
import { getMonth, getYear, setMonth, setYear } from 'date-fns';
import Typography from '@/elements/Typography';
import moment from 'moment';
import React from 'react';

interface HeaderProps {
	date: Date;
	// eslint-disable-next-line no-unused-vars
	setDate: (date: Date) => void;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
	locale?: Locale;
}

const generateYears = (relativeTo: Date, count: number) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious,
	locale,
}: HeaderProps) => {
	const MONTHS =
		typeof locale !== 'undefined'
			? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((d) =>
					locale.localize?.month(d, {
						width: 'abbreviated',
						context: 'standalone',
					})
			  )
			: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'June',
					'July',
					'Aug',
					'Sept',
					'Oct',
					'Nov',
					'Dec',
			  ];

	const dateObject = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December',
	} as any;

	const handleMonthChange = (event: SelectChangeEvent<number>) => {
		setDate(setMonth(date, parseInt(event.target.value as string, 10)));
	};

	const handleYearChange = (event: SelectChangeEvent<number>) => {
		setDate(setYear(date, parseInt(event.target.value as string, 10)));
	};
	const theme = useTheme();
	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='center'
			sx={{ paddingX: '16px', paddingY: '16px' }}>
			<Grid item>
				<IconButton
					sx={{
						padding: '3px',
						border: 'none',
						borderRadius: '3px',
						'&:hover': {
							background: 'none',
						},
					}}
					disabled={prevDisabled}
					onClick={onClickPrevious}
					// size="large"
				>
					<ChevronLeftIcon stroke={theme.palette.main.gray10} />
				</IconButton>
			</Grid>
			<Grid item justifyContent='space-between' alignItems='center'>
				{/* <FormControl variant='standard'> */}
				{/* <Select value={getMonth(date)} onChange={handleMonthChange} MenuProps={{ disablePortal: true }}>
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select> */}
				<Typography cate={'body_2_semibold'} color={theme.palette.main.gray10}>
					{`${moment(date).format('YYYY.MM')}`}
				</Typography>

				{/* </FormControl> */}
			</Grid>

			{/* <Grid item>
        <FormControl variant='standard'>
          <Select value={getYear(date)} onChange={handleYearChange} MenuProps={{ disablePortal: true }}>
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography>{format(date, "MMMM YYYY")}</Typography>
      </Grid> */}
			<Grid item>
				<IconButton
					sx={{
						padding: '3px',
						border: 'none',
						borderRadius: '3px',
						'&:hover': {
							background: 'none',
						},
					}}
					disabled={nextDisabled}
					onClick={onClickNext}
					// size="large"
				>
					<ChevronRightIcon stroke={theme.palette.main.gray10} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default Header;
