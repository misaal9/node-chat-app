const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createMsg', (message) => {
    io.emit('newMessage', {
      from: message.from,
      msg: message.msg,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, (req, res) => {
  console.log(`Listening to port ${port}`);
});
