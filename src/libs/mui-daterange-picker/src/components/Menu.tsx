/* eslint-disable object-curly-newline */
import { Divider, Grid, Paper } from '@mui/material';
import { differenceInCalendarMonths } from 'date-fns';
import React from 'react';
import { DateRange, DefinedRange, NavigationAction, Setter } from '../types';
import DefinedRanges from './DefinedRanges';
import { MARKERS } from './Markers';
import Month from './Month';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
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

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper
      elevation={5}
      square
      sx={{ boxShadow: 'none', backgroundImage: 'none' }}
    >
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            <Divider orientation="vertical" flexItem />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
