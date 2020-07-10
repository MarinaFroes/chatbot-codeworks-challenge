function getTime(date) {
  const hourMinuteSeconds = date.toTimeString().split(" ")[0].split(":");
  const formattedTime = `${hourMinuteSeconds[0]}:${hourMinuteSeconds[1]}`
  return formattedTime;
}

const MONTHS = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC'
}

function getMonth(num) {
  return MONTHS[num];
}

function getDate(date) {
  const day = date.getDate();
  const month = getMonth(date.getMonth());
  return `${month} ${day}`;
}

export function getTimestamp() {
  const d = new Date();
  const date = getDate(d);
  const time = getTime(d);
  return `${date}, ${time}`;
}