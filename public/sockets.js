     var socket = io();
      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });

      // $('.sound').click(function(){
      //   socket.emit('sound');
      // });

      // socket.on('sound', function(){
      //   oscillator.start();

      //   $('#messages').append($('<li>').text("sent sound").css("border-radius","10px"));
      // });

//kick button
      $('.kick').click(function(){
        socket.emit('kick');
      });

      socket.on('kick', function(){
        kit[0].play();
        $('#messages').append($('<li>').text("sent kick").css("border-radius","10px"));
      });

//hihat button
      $('.hihat').click(function(){
        socket.emit('hihat');
      });

      socket.on('hihat', function(){
        kit[1].play();
        $('#messages').append($('<li>').text("sent hihat").css("border-radius","10px"));
      });

//snare button
      $('.snare').click(function(){
        socket.emit('snare');
      });

      socket.on('snare', function(){
        kit[2].play();
        $('#messages').append($('<li>').text("sent snare").css("border-radius","10px"));
      });

//shaker button
      $('.shaker').click(function(){
        socket.emit('shaker');
      });

      socket.on('shaker', function(){
        kit[3].play();
        $('#messages').append($('<li>').text("sent shaker").css("border-radius","10px"));
      });

//kick keydown

      // $(document).on('keydown', function(event) {
      //    if (event.keyCode == 88) {
      //         console.log('x');
      //         socket.emit('keypress');
      //    }

      //    if (event.keyCode == 89) {
      //         console.log('y');
      //         socket.emit('keypress2');
      //    }
      // });

      // socket.on('keypress', function(){
      //   kitplay();
      //   $('#messages').append($('<li>').text("sent kick").css("border-radius","10px"));
      // });

      // socket.on('keypress2', function(){
      //   kit[2].play();
      //   $('#messages').append($('<li>').text("sent hat").css("border-radius","10px"));
      // });
