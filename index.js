var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//messages
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


//music
io.on('connection', function(socket){
  socket.on('sound', function(){
    io.emit('sound');

  });
});

io.on('connection', function(socket){
  socket.on('kick', function(){
    io.emit('kick');

  });
});

io.on('connection', function(socket){
  socket.on('keypress', function(){
    io.emit('keypress');

  });
});

io.on('connection', function(socket){
  socket.on('keypress2', function(){
    io.emit('keypress2');

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});







