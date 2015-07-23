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
  // var addedUser = false;

  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });



  socket.on('chat message', function(msg){
    io.emit('chat message',{ message: msg, username: socket.username });
    console.log(msg);
    console.log("username " + socket.username);
    console.log("hello");
  });

  socket.on('seq run', function(data){
    io.emit('seq run', data);
  })

  socket.on('seq play', function(data){
    io.emit('seq play', data);
    console.log(data);
    console.log(data.list);
  })

  socket.on('bpm value', function(tempo){
    io.emit('bpm value', tempo);
    console.log("tempo server" +tempo);
  })

  socket.on('hihat gain', function(gain){
    io.emit('hihat gain', gain);
    console.log("gain server " +gain);
  })

  socket.on('snare gain', function(gain){
    io.emit('snare gain', gain);
    console.log("snare gain server " +gain);
  })

  socket.on('kick gain', function(gain){
    io.emit('kick gain', gain);
    console.log("kick gain server " +gain);
  })

  socket.on('hihat pitch', function(pitch){
    io.emit('hihat pitch', pitch);
    console.log("hihat pitch server " +pitch);
  })

  socket.on('snare pitch', function(pitch){
    io.emit('snare pitch', pitch);
    console.log("snare pitch server " +pitch);
  })

  socket.on('kick pitch', function(pitch){
    io.emit('kick pitch', pitch);
    console.log("kick pitch server " +pitch);
  })

  socket.on('master gain', function(gain){
    io.emit('master gain', gain);
    console.log("master gain server " + gain);
  })

  socket.on('pattern', function(p) {
    io.emit('pattern', p);
    console.log("Pattern change", p);
  })

  socket.on('box', function(event){
    io.emit('box', event);
    console.log("box server " + event);
  })

  socket.on('add user', function(username){
   socket.username = username;
    users[username] = username;
    ++userCount;

    // addedUser = true;
    // socket.emit('login', {
    //   userCount: userCount
    // });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      userCount: userCount
    });
  });








//music
  socket.on('play note', function(event){
    io.emit('play note', event);
    console.log("server playNote"+ event);
    console.log(event);
  });

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
