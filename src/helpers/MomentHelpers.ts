import Moment from 'moment';
import {UnitOfTime} from '../models/Clendar';

const {MONTH, DAY, ISO_WEEK, YEAR} = UnitOfTime;

export const firstDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).startOf(MONTH);

export const lastDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).endOf(MONTH);

export const firstDateOfTheYear = (date: Date): Moment.Moment => Moment(date).startOf(YEAR);

export const lastDateOfTheYear = (date: Date): Moment.Moment => Moment(date).endOf(YEAR);

export const firstDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment =>
  firstDateOfTheMonth(date).startOf(ISO_WEEK);

export const lastDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment => firstDateOfTheMonth(date).endOf(ISO_WEEK);

export const firstDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment => lastDateOfTheMonth(date).startOf(ISO_WEEK);

export const lastDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment =>
  lastDateOfTheMonth(date).startOf(DAY).endOf(ISO_WEEK);

export const isTheSameDate = (calendarDate: Date, transactionDate: Date): boolean =>
  Moment(Moment(calendarDate).toDate()).diff(Moment(transactionDate).toDate(), DAY) === 0;
