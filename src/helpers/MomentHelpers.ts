import Moment from 'moment';
import {UnitOfTime} from '../models/Clendar';

const {MONTH, DAY, ISO_WEEK} = UnitOfTime;

export const firstDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).startOf(MONTH);

export const lastDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).endOf(MONTH);

export const firstDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment =>
  firstDateOfTheMonth(date).startOf(ISO_WEEK);

export const firstDateOfYear = Moment().clone().startOf(UnitOfTime.YEAR).format('YYYY-MM-DD hh:mm');
export const lastDateOfYear = Moment().clone().endOf(UnitOfTime.YEAR).format('YYYY-MM-DD hh:mm');
export const firstDateOfMonth = Moment().clone().startOf('month').format('YYYY-MM-DD hh:mm');
export const lastDateOfMonth = Moment().clone().endOf('month').format('YYYY-MM-DD hh:mm');

export const lastDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment => firstDateOfTheMonth(date).endOf(ISO_WEEK);

export const firstDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment => lastDateOfTheMonth(date).startOf(ISO_WEEK);

export const lastDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment =>
  lastDateOfTheMonth(date).startOf(DAY).endOf(ISO_WEEK);

export const isTheSameDate = (calendarDate: Date, transactionDate: Date): boolean =>
  Moment(calendarDate).diff(transactionDate, DAY) === 0;
