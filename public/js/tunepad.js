(function(){

  var context2 = new AudioContext();
  var getSound = new XMLHttpRequest();
  getSound.open("GET", "samples/dilla/dot_matrix.wav", true);
  getSound.responseType = "arraybuffer";

  getSound.onload = function() {
    context2.decodeAudioData(getSound.response, function(buffer){
      electro = buffer;
    });
  }

  getSound.send();

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });
  
  socket.on('box', function(event){
    switch (event) {
      case 88:
        var playSound = context2.createBufferSource();
        playSound.buffer = electro;
        playSound.connect(context2.destination);
        $('.box1').addClass('pad-down');
          playSound.start(0);
        setTimeout(function(){
          $('.box1').removeClass('pad-down');      
        }, 300);
      break;
      case 89:
        var playSound = context2.createBufferSource();
        playSound.buffer = electro;
        playSound.connect(context2.destination);
        playSound.start(0);
      break;
    }
  });

})();
