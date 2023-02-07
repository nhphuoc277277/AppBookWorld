const formatDate = (
  date,
  formatDate = 'ddmmyyyy',
  formatDate2 = '/',
  isUTC = false,
) => {
  let d = new Date(date);
  let month;
  let day;
  let year;
  let hour;
  let minute;
  let seconds;
  if (!isUTC) {
    month = '' + (d.getMonth() + 1);
    day = '' + d.getDate();
    year = d.getFullYear();
    hour = d.getHours();
    minute = d.getMinutes();
    seconds = d.getSeconds();
  } else {
    month = '' + (d.getUTCMonth() + 1);
    day = '' + d.getUTCDate();
    year = d.getUTCFullYear();
    hour = d.getUTCHours();
    minute = d.getUTCMinutes();
    seconds = d.getUTCSeconds();
  }

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (formatDate === 'ddmmyyyy') return [day, month, year].join(formatDate2);
  if (formatDate === 'yyyymmdd') return [year, month, day].join(formatDate2);
  if (formatDate === 'hhmm') return [hour, minute].join(':');
  if (formatDate === 'hhmmss') return [hour, minute, seconds].join(':');
};
export default formatDate;
