
//beware very wet code below!

(function(){
  var getSound = new XMLHttpRequest();
  getSound.open("GET", "samples/dilla/pada_kick.wav", true);
  getSound.responseType = "arraybuffer";

  getSound.onload = function() {
    context.decodeAudioData(getSound.response, function(buffer){
      kick = buffer;
    });
  }

  getSound.send();

//
  var getSound2 = new XMLHttpRequest();
  getSound2.open("GET", "samples/dilla/accent2.wav", true);
  getSound2.responseType = "arraybuffer";

  getSound2.onload = function() {
    context.decodeAudioData(getSound2.response, function(buffer){
      accent2 = buffer;
    });
  }

  getSound2.send();

//
  var getSound3 = new XMLHttpRequest();
  getSound3.open("GET", "samples/dilla/accent1.wav", true);
  getSound3.responseType = "arraybuffer";

  getSound3.onload = function() {
    context.decodeAudioData(getSound3.response, function(buffer){
      accent1 = buffer;
    });
  }

  getSound3.send();

//
  var getSound4 = new XMLHttpRequest();
  getSound4.open("GET", "samples/dilla/padguitar.wav", true);
  getSound4.responseType = "arraybuffer";

  getSound4.onload = function() {
    context.decodeAudioData(getSound4.response, function(buffer){
      padguitar = buffer;
    });
  }

  getSound4.send();

//
  var getSound5 = new XMLHttpRequest();
  getSound5.open("GET", "samples/dilla/padfx1.wav", true);
  getSound5.responseType = "arraybuffer";

  getSound5.onload = function() {
    context.decodeAudioData(getSound5.response, function(buffer){
      padfx1 = buffer;
    });
  }

  getSound5.send();

//
  var getSound6 = new XMLHttpRequest();
  getSound6.open("GET", "samples/dilla/padfx2.wav", true);
  getSound6.responseType = "arraybuffer";

  getSound6.onload = function() {
    context.decodeAudioData(getSound6.response, function(buffer){
      padfx2 = buffer;
    });
  }

  getSound6.send();



  var getSound7 = new XMLHttpRequest();
  getSound7.open("GET", "samples/dilla/string1.wav", true);
  getSound7.responseType = "arraybuffer";

  getSound7.onload = function() {
    context.decodeAudioData(getSound7.response, function(buffer){
      string1 = buffer;
    });
  }

  getSound7.send();


//
  var getSound8 = new XMLHttpRequest();
  getSound8.open("GET", "samples/dilla/string2.wav", true);
  getSound8.responseType = "arraybuffer";

  getSound8.onload = function() {
    context.decodeAudioData(getSound8.response, function(buffer){
      string2 = buffer;
    });
  }

  getSound8.send();



  socket.on('box', function(event){
    switch (event) {
      case 84:
        var playSound = context.createBufferSource();
        playSound.buffer = kick;
        playSound.connect(context.destination);
        $('.box1').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box1').removeClass('pad-down');      
        }, 300);
      break;
      case 89:
        var playSound = context.createBufferSource();
        playSound.buffer = accent2;
        playSound.connect(context.destination);
        $('.box2').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box2').removeClass('pad-down');      
        }, 300);
      break;
      case 85:
        var playSound = context.createBufferSource();
        playSound.buffer = accent1;
        playSound.connect(context.destination);
        $('.box3').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box3').removeClass('pad-down');      
        }, 300);
      break;
      case 73:
        var playSound = context.createBufferSource();
        playSound.buffer = padguitar;
        playSound.connect(context.destination);
        $('.box4').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box4').removeClass('pad-down');      
        }, 300);
      break;
      case 79:
        var playSound = context.createBufferSource();
        playSound.buffer = padfx1;
        playSound.connect(context.destination);
        $('.box5').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box5').removeClass('pad-down');      
        }, 300);
      break;
      case 80:
        var playSound = context.createBufferSource();
        playSound.buffer = padfx2;
        playSound.connect(context.destination);
        $('.box6').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box6').removeClass('pad-down');      
        }, 300);
      break;
      case 219:
        var playSound = context.createBufferSource();
        playSound.buffer = string1;
        playSound.connect(context.destination);
        $('.box7').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box7').removeClass('pad-down');      
        }, 300);
      break;
      case 221:
        var playSound = context.createBufferSource();
        playSound.buffer = string2;
        playSound.connect(context.destination);
        $('.box8').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box8').removeClass('pad-down');      
        }, 300);
      break;
    }
  });

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });
  

})();
