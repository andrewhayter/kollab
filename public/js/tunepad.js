(function(){
  var samples = {}

  function loadSample(name, done) {
    var getSound = new XMLHttpRequest();
    getSound.open("GET", "samples/dilla/" + name + '.wav', true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function sampleWasLoaded() {
      context.decodeAudioData(getSound.response, function(buffer){
        samples[name] = buffer;
        done();
      });
    };

    getSound.send();

  }

      var samples = {
        84: { name: '.box1' },
        89: { name: '.box2' },
        85: { name: '.box3' },
        73: { name: '.box4' },
        79: { name: '.box5' },
        80: { name: '.box6' },
        219: { name: '.box7' },
        221: { name: '.box8' },
    };

  var soundNames = ['scream'];
//
  socket.on('box', function(event){
      switch (event) {
        for (var i; i < samples.length; i++) {
        case event:
          var playSound = context.createBufferSource();
          playSound.buffer = samples[name];
          playSound.connect(masterVolume);

          $('.box4').addClass('pad-down');
            playSound.start(0);
          setTimeout(function(){
            $('.box4').removeClass('pad-down');      
          }, 300);
        break;
      }
    }

  });

  window.addEventListener("keydown", function(event){
    if (!$('#m').is(':focus')) {
      socket.emit('box', event.keyCode);
    };
  });
  

})();
