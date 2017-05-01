const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./util/message');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  // welcome new user to group
  socket.emit('welcomeUser', generateMessage('Admin', 'Welcome to the chat'));

  // notify all of new user added
  socket.broadcast.emit('newUserAdd', generateMessage('Admin', 'New user has been added'));

  socket.on('createMsg', (message) => {
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, (req, res) => {
  console.log(`Listening to port ${port}`);
});
