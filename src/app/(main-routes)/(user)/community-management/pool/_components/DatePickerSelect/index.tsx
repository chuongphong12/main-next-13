import ChevronLeftIcon from '@/assets/icons/chevron-left';
import ChevronRightIcon from '@/assets/icons/chevron-right';
import Button from '@/elements/Button';
import RangeDatepicker from '@/elements/RangeDatePicker';
import Select from '@/elements/Select';
import Typography from '@/elements/Typography';
import { Box, Grid, useTheme } from '@mui/material';
import moment from 'moment';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Calendar from 'react-calendar';
import { View } from '../../../../../../../../node_modules/react-calendar/dist/cjs/shared/types';

type DatePickerSelectProps = {
	type: View;
	onSubmit: Function;
	currentlyWorking?: boolean;
	placeholder?: string;
};

const DatePickerSelect = forwardRef(
	({ type, onSubmit, currentlyWorking, placeholder }: DatePickerSelectProps, ref) => {
		const [selectOpen, setSelectOpen] = useState<boolean>(false);
		const theme = useTheme();
		const [displayValue, setDisplayValue] = useState<string>('');
		const [datePickerChange, setDatePickerChange] = useState<boolean>(false);
		const [startValue, setStartValue] = useState<Date | undefined>(new Date());
		const [endValue, setEndValue] = useState<Date | undefined>(new Date());
		useImperativeHandle(ref, () => ({
			resetDatePicker: () => {
				setDisplayValue('');
				setStartValue(new Date());
				setEndValue(new Date());
			},
		}));
		const onStartValueChange = (e: any) => {
			setDatePickerChange(true);
			setStartValue(e);
		};

		const onEndValueChange = (e: any) => {
			setDatePickerChange(true);
			setEndValue(e);
		};

		const [state, setState] = useState([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			},
		]);

		const handleOnChange = (ranges: any) => {
			const { selection } = ranges;
			// onChange(selection);
			setState([selection]);
		};

		useEffect(() => {
			if (!datePickerChange) return;
			if (currentlyWorking === true) {
				setDisplayValue(`${moment(startValue).format('YYYY.MM')} 
        ~ ${'재직중'}`);
			} else {
				setDisplayValue(`${moment(startValue).format('YYYY.MM')} 
        ~ ${moment(endValue).format('YYYY.MM')}`);
			}
		}, [currentlyWorking]);

		return (
			<Select
				placeholder={!!placeholder ? placeholder : '근무기간 선택'}
				displayEmpty
				fullWidth
				className='dropbox-monthpicker'
				id='selectWrapper'
				defaultOpen={false}
				open={selectOpen}
				onOpen={() => {
					setSelectOpen(true);
				}}
				onClose={(e: any) => {
					if (
						!!e?.target?.className &&
						typeof e?.target?.className === 'string' &&
						!e?.target?.className?.includes('dropbox-monthpicker') &&
						!e?.target?.parentNode.className?.includes('dropbox-monthpicker') &&
						!e?.target?.className?.includes('react-calendar__navigation') &&
						!e?.target?.parentNode.className?.includes('react-calendar__navigation') &&
						!e?.target?.className?.includes('react-calendar__viewContainer') &&
						!e?.target?.parentNode.className?.includes('react-calendar__viewContainer') &&
						!e?.target?.className?.includes('react-calendar__year-view') &&
						!e?.target?.parentNode.className?.includes('react-calendar__year-view')
					) {
						setSelectOpen(false);
					}
				}}
				renderValue={(value) => {
					return (
						<Typography cate='body_3' color={theme.palette.main.gray30}>
							{!!displayValue
								? displayValue
								: !!placeholder
								? placeholder
								: '근무기간 선택'}
						</Typography>
					);
				}}>
				<Box
					display={'flex'}
					flexDirection='column'
					p={2}
					className='dropbox-monthpicker'>
					{type === 'month' ? (
						<RangeDatepicker
							onDateRangeChange={(range) => {
								setStartValue(range.startDate);
								setEndValue(range.endDate);
							}}
							dateRange={{ startDate: startValue, endDate: endValue }}
						/>
					) : (
						<Grid
							container
							spacing={type === 'year' ? 2 : 0}
							className='dropbox-monthpicker'>
							<Grid item xs={6} className={'dark_mode_' + type + ' dropbox-monthpicker'}>
								<Calendar
									onChange={onStartValueChange}
									defaultView={type}
									className={'dropbox-monthpicker'}
									tileClassName={'dropbox-monthpicker'}
									maxDate={new Date()}
									maxDetail={type}
									locale={type === 'year' ? 'ko' : 'en'}
									value={startValue}
									calendarType='gregory'
									view={type}
									nextLabel={
										<ChevronRightIcon
											className={'dropbox-monthpicker'}
											stroke={theme.palette.main.gray10}
										/>
									}
									prevLabel={
										<ChevronLeftIcon
											className={'dropbox-monthpicker'}
											stroke={theme.palette.main.gray10}
										/>
									}
								/>
							</Grid>
							<Grid item xs={6} className={'dark_mode_' + type + ' dropbox-monthpicker'}>
								<Calendar
									onChange={onEndValueChange}
									defaultView={type}
									maxDetail={type}
									className={'dropbox-monthpicker'}
									minDate={startValue}
									maxDate={new Date()}
									value={endValue}
									tileClassName={'dropbox-monthpicker'}
									calendarType='gregory'
									locale={type === 'year' ? 'ko' : 'en'}
									view={type}
									nextLabel={
										<ChevronRightIcon
											className={'dropbox-monthpicker'}
											stroke={theme.palette.main.gray10}
										/>
									}
									prevLabel={
										<ChevronLeftIcon
											className={'dropbox-monthpicker'}
											stroke={theme.palette.main.gray10}
										/>
									}
								/>
							</Grid>
						</Grid>
					)}
					<Box
						display='flex'
						justifyContent={'space-between'}
						className='dropbox-monthpicker'
						alignItems={'center'}
						mt={2}>
						<Typography
							cate='body_3'
							color={theme.palette.main.gray10}
							className='dropbox-monthpicker'>
							{moment(startValue).format(type === 'year' ? 'YYYY.MM' : 'YYYY.MM.DD')} ~{' '}
							{moment(endValue).format(type === 'year' ? 'YYYY.MM' : 'YYYY.MM.DD')}
						</Typography>
						<Button
							onClick={() => {
								onSubmit(startValue, endValue);
								setDisplayValue(`${moment(startValue).format('YYYY.MM')} 
              ~ ${
								currentlyWorking === true ? '재직중' : moment(endValue).format('YYYY.MM')
							}`);
								setSelectOpen(false);
							}}
							className='dropbox-monthpicker'
							isNonSubmit
							// className="dropbox-category"
							title={'적용'}
							// sx={{ width: convertToRem(105), height: convertToRem(44) }}
							cate={'outline'}
							customType={'active'}
							rounded
							customSize={'sm'}
							sx={{ padding: '0.8rem 2.5rem' }}
						/>
					</Box>
				</Box>
			</Select>
		);
	}
);

DatePickerSelect.displayName = 'DatePickerSelect';
export default DatePickerSelect;
