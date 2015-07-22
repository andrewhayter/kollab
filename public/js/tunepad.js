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
        84: { boxName: '.box1' },
        89: { boxName: '.box2' },
        85: { boxName: '.box3' },
        73: { boxName: '.box4' },
        79: { boxName: '.box5' },
        80: { boxName: '.box6' },
        219: { boxName: '.box7' },
        221: { boxName: '.box8' },
    };

  var soundNames = ['scream'];
//
  socket.on('box', function(event){
    for (var i; i < samples.length; i++) {
      switch (event) {        
        case i.key:
          var playSound = context.createBufferSource();
          playSound.buffer = samples[name];
          playSound.connect(masterVolume);

          $(samples.boxName).addClass('pad-down');
            playSound.start(0);
          setTimeout(function(){
            $(samples.boxName).removeClass('pad-down');      
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
