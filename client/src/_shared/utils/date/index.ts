import {
  GetDateAfterDays,
  GetDiffDaysFromNow,
  GetNow,
  GetRelativeTimeFromNow,
  GetTodayDate,
  IsToday,
  GetDailyRange,
} from '@shared/utils/date/types';
import moment from 'moment';

export const getDiffDaysFromNow: GetDiffDaysFromNow = (target) => {
  return moment().diff(moment(target), 'days');
};

export const getTodayDateTime: GetTodayDate = () => {
  return moment().startOf('day').format();
};

export const getDateTimeAfterDays: GetDateAfterDays = (days: number) => {
  return moment().startOf('day').add(days, 'days').format();
};

export const getNow: GetNow = () => {
  return moment().format();
};

export const isToday: IsToday = (target) => {
  return moment(target).isSame(getNow(), 'd');
};

export const getRelativeTimeFromNow: GetRelativeTimeFromNow = (target) => {
  return moment(target).fromNow();
};

export const getDailyRange: GetDailyRange = () => {
  const monthStartDay = moment().startOf('month').format();
  const today = moment().startOf('day').format();
  return `${monthStartDay}..${today}`;
};
