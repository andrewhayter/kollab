var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});


socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg).css("border-radius","10px"));
});


$('.sound').click(function(){
  socket.emit('sound');
});


socket.on('sound', function(){
  oscillator.start();

  $('#messages').append($('<li>').text("sent sound").css("border-radius","10px"));
});

//kick button
$('.kick').click(function(){
  socket.emit('kick');
});


socket.on('kick', function(){
  kit[1].play();
  $('#messages').append($('<li>').text("sent kick").css("border-radius","10px"));
});
//kick keydown      
  

$(document).on('keydown', function(event) {
   if (event.keyCode == 88) {
        console.log('x');
        socket.emit('keypress');
   }

   if (event.keyCode == 89) {
        console.log('y');
        socket.emit('keypress2');
   }

});      


socket.on('keypress', function(){
  kit[1].play();
  $('#messages').append($('<li>').text("sent kick").css("border-radius","10px"));
});

socket.on('keypress2', function(){
  kit[2].play();
  $('#messages').append($('<li>').text("sent hat").css("border-radius","10px"));
});

// Oscillator and keyboard


