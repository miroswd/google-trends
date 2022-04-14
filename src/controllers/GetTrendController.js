const googleTrends = require('google-trends-api')

class GetTrendController {
  /**
   * @param {Object} data
   * @param {String=} data.geo Example - ("US", "BR")
   */
  constructor({ geo = 'BR' }) {
    this.geo = geo;
  }

  async realTimeTrends(category) {
    const necessaryInfos = []

    const trends = googleTrends.realTimeTrends({
      geo: this.geo,
      category, // { All: 'all', Entertainment: 'e', Business : 'b', Science/Tech : 't', Health : 'm', Sports : 's', Top Stories : 'h' }
    }, (err, results) => {
      if (err) throw new Error(err.message)

      const { storySummaries: { trendingStories }, date } = JSON.parse(results)

      for (let trend of trendingStories) {
        const { articles, entityNames, image } = trend
        necessaryInfos.push({ articles, entityNames, image })
      }

      return necessaryInfos
    })
    return trends
  }

  /**
   * @param {Date} [date=new Date()] 
   * @example new Date('03-11-2000')
   */
  async dailyTrend(date = new Date()) {
    const trends = googleTrends.dailyTrends({
      trendDate: date,
      geo: this.geo,

    }, function (err, results) {
      if (err) throw new Error(err.message)

      const { default: { trendingSearchesDays } } = JSON.parse(results)

      return trendingSearchesDays[0].trendingSearches.map(trend => {
        delete trend.trendQueries; return trend
      })

    });
    return trends
  }
}

module.exports = GetTrendController 