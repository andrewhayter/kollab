var socket = io();


$('.chat-form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  if (msg != '') {
    $('#messages').append($('<li>').text(msg).css("border-radius","10px"));
  };
});

var el = document.getElementById('messages');

$('.submit-button').click(function(){
  $('#messages').scrollTop( el.scrollHeight );
});

$('.login-form').submit(function(){
  socket.emit('username', $('.login-input').val());
  $('.user-name').fadeOut();
  // alert("heelo");
  return false;
});


