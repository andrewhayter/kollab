var socket = io();


$('.chat-form').submit(function(msg){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});



socket.on('chat message', function(data){
  if (data.message != '') {
    $('#messages').append($('<li>').text(data.username + ": " + data.message).css("border-radius","5px"));
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
  $('.user-name').fadeOut(1500);
  return false;
});

socket.on('user joined', function (data) {
  
  $('#messages').append($('<li>').text(data.username + " has joined").css("background","none").css("font-style", "italic"));

});


