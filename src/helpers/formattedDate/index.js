
const moment = require('moment');
const momenttz = require('moment-timezone');

/**
 * @description Get the current time
 * @function formattedDate
 * @returns {String}
 */
const formattedDate = () => {
  const utcDate = momenttz.tz(new Date(), 'America/Sao_Paulo');
  const now = moment(utcDate).format('DD/MM/YYYY - HH:mm');
  return now;
};

module.exports = formattedDate;