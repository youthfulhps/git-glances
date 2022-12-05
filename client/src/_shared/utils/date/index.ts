import {
  GetDateAfterDays,
  GetDiffDaysFromNow,
  GetTodayDate,
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
