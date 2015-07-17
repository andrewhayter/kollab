var socket = io();

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  if (msg != '') {
    $('#messages').append($('<li>').text(msg).css("border-radius","10px"));
  };
});

socket.on('sound', function(){
  oscillator.start();
  $('#messages').append($('<li>').text("sent sound").css("border-radius","10px"));
});


