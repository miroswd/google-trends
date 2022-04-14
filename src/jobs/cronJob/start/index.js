const CronJob = require('cron').CronJob;
const { formattedDate } = require('../../../helpers');

/**
 * @function1
 * @description Automate the task with crontab.
 *  To get the expected time in cron
 *  format go to: https://crontab.guru/#*_*_*_*_*
 * @param {String} time eg.: "* * * * *"
 * @param {Function} job
 * @param {String} service Describe task
 */
const startJob = (time, job, service) => {
  new CronJob(
    time,
    async function () {
      await job();
      const dateNow = formattedDate();
      console.log(`Running job: ${service} at ${dateNow}`);
    },
    null,
    true,
    'America/Sao_Paulo',
  );
};

module.exports = startJob;