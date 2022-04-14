const cors = require('cors')
const express = require("express")
const routes = require("./routes")
const http = require('http')
const { setupSocket, } = require('./socket')
const { realTimeTrendJob } = require('./jobs/cronJob')

const app = express()
const server = http.createServer(app)

setupSocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3000, () => {
  console.log(`Running on 3000`)
  realTimeTrendJob()
})

