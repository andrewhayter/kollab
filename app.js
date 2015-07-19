var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var users = {};
var userCount = 0;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/seq', function(req, res) {
  res.sendFile(__dirname + '/sequencer.html');
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//messages
//keeping with socket as opposed to client for user
io.on('connection', function(socket){
  var addedUser = false;
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
    console.log("hello");
  });

  socket.on("join", function(name){
      people[socket.id] = name;
      socket.emit("update", "You have connected to the server.");
      socket.sockets.emit("update", name + " has joined the server.")
      console.log(name);
      socket.sockets.emit("update-people", people);
  });






// Receving empty object
  socket.on('play note', function(event){
    io.emit('play note', event);
    console.log("server playNote"+ event);
    console.log(event);
  });
//music
  socket.on('sound', function(){
    io.emit('sound');
  });
  socket.on('end note', function(event){
    io.emit('end note', event);
    console.log("server endNote"+ event);
    console.log(event);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
