

(function(){

  var audioCtx = new AudioContext();
  var gainNode = null;
  var oscillator = null;

  var notesByKeyCode = {
    81: 261.6,
    87: 293.7,
    69: 329.6,
    82: 349.2,
    84: 392,
    89: 440,
    85: 493.9,
    73: 523.3,
    79: 587.3,
    80: 659.3
  };


  var keySound = new Sound();

  function Sound(){
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.start(0);
  };


  Sound.prototype.play = function(){
    oscillator.connect(audioCtx.destination); 
  };

  Sound.prototype.stop = function(){
    oscillator.disconnect();
  };

  function startNote(event){
    var keyCode = event.keyCode;

    for (key in notesByKeyCode) {
      if (notesByKeyCode.hasOwnProperty(key)) {
        if (key == keyCode){
          oscillator.frequency.value = notesByKeyCode[key];
          // gainNode.connect(audioCtx.destination);
          // gainNode.gain.value = 3;
          keySound.play();
          $('#keyboard [data-value="' + keyCode + '"]').addClass('notepressed');
        }
      }        
    }
  }

  function endNote(){
    keySound.stop();
    $('#keyboard div').removeClass('notepressed');
    
  }

  window.addEventListener('keydown', startNote);
  window.addEventListener('keyup', endNote);


  // document.getElementById('slider').addEventListener('input',function(event){
  //   gainNode.gain.value = event.target.value;
  // });
 

})();

//nexus


