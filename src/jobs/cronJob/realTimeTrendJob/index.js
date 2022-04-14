
const { TIME: { REAL_TIME } } = require('../../../constants/cronjob');
const { GetTrendController } = require('../../../controllers');
const { realtimeTrend } = require('../../../socket');
const startJob = require('../start');

const authJob = () => {

  const getTrendController = new GetTrendController({ geo: 'BR' })

  const forceSocket = async () => {
    const trends = await getTrendController.realTimeTrends('t')
    realtimeTrend(trends)
  }

  startJob(REAL_TIME, forceSocket, 'update trends');
};

module.exports = authJob;