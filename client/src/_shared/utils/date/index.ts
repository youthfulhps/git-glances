import { GetDiffDaysFromNow } from '@shared/utils/date/types';
import moment from 'moment';

export const getDiffDaysFromNow: GetDiffDaysFromNow = (target) => {
  return moment().diff(moment(target), 'days');
};
