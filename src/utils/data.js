import dayjs from 'dayjs';
//import {duration} from 'flatpickr/dist/utils/dates';

const DATE_FORMAT = {
  year: 'YYYY',
  dayMonthYear: 'DD MMMM YYYY',
};

const MINUTS_IN_HOUR = 60;

function humanizeDateYear(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT.year) : '';
}

function humanizeDateDayMonthYear(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT.dayMonthYear) : '';
}

function humanizeDateHoursMin(timeInMimutes) {
  if(timeInMimutes === MINUTS_IN_HOUR) {
    return '1h';
  } else if(timeInMimutes > MINUTS_IN_HOUR) {
    return `${Math.floor(timeInMimutes / MINUTS_IN_HOUR)}h ${timeInMimutes % MINUTS_IN_HOUR}m`;
  } else {
    return `${timeInMimutes}m`;
  }
}

export {humanizeDateYear, humanizeDateDayMonthYear, humanizeDateHoursMin};
