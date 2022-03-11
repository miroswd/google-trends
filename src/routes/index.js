const { Router } = require('express');
const { GetTrendController } = require('../controllers');

const routes = Router()
const getTrendController = new GetTrendController({ geo: 'BR' })


// getTrendController.dailyTrend()

routes.get('/realtime', async (req, res) => {
  try {
    const { category } = req.query
    const trends = await getTrendController.realTimeTrends(category)
    return res.status(200).json({ trends })
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

routes.get('/daily-trend', async (req, res) => {
  try {
    const daily = await getTrendController.dailyTrend()
    return res.status(200).json({ daily })
  } catch (error) {
    return res.status(500).json(error.message)
  }
})


module.exports = routes