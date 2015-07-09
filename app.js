var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log('new connection');

  socket.on('play', function() {
    io.emit('play');
  });

  socket.on('stop', function() {
    io.emit('stop');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
