import React from 'react';
import { Paper, Grid, useTheme, useMediaQuery } from '@mui/material';
import {
	getDate,
	isSameMonth,
	isToday,
	format,
	isWithinInterval,
	endOfWeek,
	startOfWeek,
} from 'date-fns';
import {
	chunks,
	getDaysInMonth,
	isStartOfRange,
	isEndOfRange,
	inDateRange,
	isRangeSameDay,
} from '../utils';
import Header from './Header';
import Day from './Day';

import { NavigationAction, DateRange } from '../types';
import Typography from '@/elements/Typography';
import { convertToRem } from '@/utils/convert-to-rem';
import moment from 'moment';
import WebInfoService from '@/services/web-info.service';

interface MonthProps {
	value: Date;
	marker: symbol;
	dateRange: DateRange;
	minDate: Date;
	maxDate: Date;
	navState: [boolean, boolean];
	// eslint-disable-next-line no-unused-vars
	setValue: (date: Date) => void;
	helpers: {
		// eslint-disable-next-line no-unused-vars
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		// eslint-disable-next-line no-unused-vars
		onDayClick: (day: Date) => void;
		// eslint-disable-next-line no-unused-vars
		onDayHover: (day: Date) => void;
		// eslint-disable-next-line no-unused-vars
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
	locale?: Locale;
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
	const {
		helpers,
		handlers,
		value: date,
		dateRange,
		marker,
		setValue: setDate,
		minDate,
		maxDate,
		locale,
	} = props;

	const weekStartsOn = locale?.options?.weekStartsOn || 0;
	const WEEK_DAYS =
		typeof locale !== 'undefined'
			? [0, 1, 2, 3, 4, 5, 6, 7].map((d) =>
					locale.localize?.day((d + weekStartsOn) % 7, {
						width: 'short',
						context: 'standalone',
					})
			  )
			: WebInfoService.getLanguage() === 'kr'
			? ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
			: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const [back, forward] = props.navState;
	const theme = useTheme();
	const smDown = useMediaQuery('(max-width: 576px)');
	return (
		<Paper
			square
			elevation={0}
			sx={{ width: convertToRem(424), background: theme.palette.main.gray60 }}>
			<Grid container>
				<Header
					date={date}
					setDate={setDate}
					nextDisabled={!forward}
					prevDisabled={!back}
					onClickPrevious={() =>
						handlers.onMonthNavigate(marker, NavigationAction.Previous)
					}
					onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
					locale={locale}
				/>

				<Grid
					item
					container
					direction='row'
					justifyContent='center'
					sx={{
						marginTop: '10px',
						// paddingLeft: '24px',
						// paddingRight: '24px',
					}}>
					{WEEK_DAYS.map((day, index) => (
						<Typography
							sx={{ width: smDown ? '35px' : '55px' }}
							cate={'caption_2_semibold'}
							textAlign={'center'}
							color={
								index === 0
									? theme.palette.main.danger
									: index === WEEK_DAYS.length - 1
									? theme.palette.main.primary_light
									: theme.palette.main.gray10
							}
							key={index}>
							{day}
						</Typography>
					))}
				</Grid>

				<Grid
					item
					container
					direction='column'
					justifyContent='space-between'
					rowGap={1}
					sx={{
						paddingLeft: '15px',
						paddingRight: '15px',
						marginTop: '15px',
						marginBottom: '20px',
					}}>
					{chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (
						<Grid key={idx} container direction='row' justifyContent='center'>
							{week.map((day) => {
								const isStart = isStartOfRange(dateRange, day);
								const isEnd = isEndOfRange(dateRange, day);
								const isEndOfWeek =
									moment(endOfWeek(day)).format('YYYY.MM.DD') ===
									moment(day).format('YYYY.MM.DD');
								const isStartOfWeek =
									moment(startOfWeek(day)).format('YYYY.MM.DD') ===
									moment(day).format('YYYY.MM.DD');
								const isRangeOneDay = isRangeSameDay(dateRange);
								const highlighted =
									inDateRange(dateRange, day) || helpers.inHoverRange(day);

								return (
									<Day
										key={format(day, 'dd-MM-yyyy')}
										filled={isStart || isEnd}
										outlined={isToday(day)}
										highlighted={highlighted && !isRangeOneDay}
										disabled={
											!isSameMonth(date, day) ||
											!isWithinInterval(day, { start: minDate, end: maxDate })
										}
										startOfRange={isStart && !isRangeOneDay}
										endOfRange={isEnd && !isRangeOneDay}
										isEndOfWeek={isEndOfWeek}
										isStartOfWeek={isStartOfWeek}
										onClick={() => handlers.onDayClick(day)}
										onHover={() => handlers.onDayHover(day)}
										value={getDate(day)}
									/>
								);
							})}
						</Grid>
					))}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Month;
