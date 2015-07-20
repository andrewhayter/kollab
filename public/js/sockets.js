var socket = io();


$('.chat-form').submit(function(msg){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(data){
  // var boldName = data.username.css("font-weight", "bold");
  console.log(data.username);
  if (data.message != '') {
    $('#messages').append($('<li>').text(data.username + ": " + data.message).css("border-radius","10px"));
    console.log(data.message);
  };
});


var el = document.getElementById('messages');

$('.submit-button').click(function(){
  $('#messages').scrollTop( el.scrollHeight );
});

$('.login-input').focus();

$('.login-form').submit(function(username){
  socket.emit('add user', $('#log-input').val());
  // console.log(username);
  $('.user-name').fadeOut(1500);
  return false;
});

socket.on('user joined', function (data) {
  // log(data.username + ' joined');
  $('#messages').append($('<li>').text(data.username + " has joined").css("border-radius","10px"));
  // console.log("hello " + data.username);
});


