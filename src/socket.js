const connections = [];

let io;
exports.setupSocket = (server) => {
  const { Server } = require('socket.io')
  io = io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', socket => {
    connections.push(socket.id)
    socket.emit('receive', 'fala fiote')
  })
}

exports.realtimeTrend = params => {
  connections.forEach(connection => {
    io.emit('realtime-trend', params)
  })
}


