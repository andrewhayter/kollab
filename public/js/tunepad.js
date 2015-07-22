(function(){

  var context2 = new AudioContext();
  var getSound = new XMLHttpRequest();
  getSound.open("GET", "samples/dilla/dot_matrix.wav", true);
  getSound.responseType = "arraybuffer";

  getSound.onload = function() {
    context2.decodeAudioData(getSound.response, function(buffer){
      printer = buffer;
    });
  }

  getSound.send();


  var getSound2 = new XMLHttpRequest();
  getSound2.open("GET", "samples/dilla/scream.wav", true);
  getSound2.responseType = "arraybuffer";

  getSound2.onload = function() {
    context2.decodeAudioData(getSound2.response, function(buffer){
      scream = buffer;
    });
  }

  getSound2.send();

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });

  var getSound3 = new XMLHttpRequest();
  getSound3.open("GET", "samples/dilla/scream.wav", true);
  getSound3.responseType = "arraybuffer";

  getSound3.onload = function() {
    context2.decodeAudioData(getSound3.response, function(buffer){
      electro = buffer;
    });
  }

  getSound3.send();

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });

  var getSound4 = new XMLHttpRequest();
  getSound4.open("GET", "samples/dilla/scream.wav", true);
  getSound4.responseType = "arraybuffer";

  getSound4.onload = function() {
    context2.decodeAudioData(getSound4.response, function(buffer){
      electro2 = buffer;
    });
  }

  getSound4.send();

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });
  
  socket.on('box', function(event){
    switch (event) {
      case 85:
        var playSound = context2.createBufferSource();
        playSound.buffer = printer;
        playSound.connect(context2.destination);
        $('.box1').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box1').removeClass('pad-down');      
        }, 300);
      break;
      case 73:
        var playSound = context2.createBufferSource();
        playSound.buffer = scream;
        playSound.connect(context2.destination);
        $('.box2').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box2').removeClass('pad-down');      
        }, 300);
      break;
      case 79:
        var playSound = context2.createBufferSource();
        playSound.buffer = electro;
        playSound.connect(context2.destination);
        $('.box3').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box3').removeClass('pad-down');      
        }, 300);
      break;
      case 80:
        var playSound = context2.createBufferSource();
        playSound.buffer = electro2;
        playSound.connect(context2.destination);
        $('.box4').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box4').removeClass('pad-down');      
        }, 300);
      break;
    }
  });

})();
