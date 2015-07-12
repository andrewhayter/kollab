

(function(){

  var audioCtx = new AudioContext();
  var gainNode = audioCtx.createGain();
    
    

  var notesByKeyCode = [
    [81, 261.6],
    [87, 293.7],
    [69, 329.6],
    [82, 349.2],
    [84, 392],
    [89, 440],
    [85, 493.9],
    [73, 523.3],
    [79, 587.3],
    [80, 659.3]
  ];



function loadKeyboard(){

  var keySound = new Sound();

  function Sound(){
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.start(0);
  };


    Sound.prototype.play = function(){
      gainNode.connect(audioCtx.destination);
      oscillator.connect(audioCtx.destination);
    };

    Sound.prototype.stop = function(){
      oscillator.disconnect();
    };

    function startNote(event){
      
      var keyCode = event.keyCode;
        switch (keyCode) {
          case 81:
            oscillator.frequency.value = notesByKeyCode[0][1];
            $('#keyboard div:nth-child(10)').addClass('notepressed');
            keySound.play();
            break;
          case 87:
            oscillator.frequency.value = notesByKeyCode[1][1];
            $('#keyboard div:nth-child(9)').addClass('notepressed');
            keySound.play();
            break;
          case 69:
            oscillator.frequency.value = notesByKeyCode[2][1];
            $('#keyboard div:nth-child(8)').addClass('notepressed');
            keySound.play();
            break;
          case 82:
            oscillator.frequency.value = notesByKeyCode[3][1];
            $('#keyboard div:nth-child(7)').addClass('notepressed');
            keySound.play();
            break;
          case 84:
            oscillator.frequency.value = notesByKeyCode[4][1];
            $('#keyboard div:nth-child(6)').addClass('notepressed');
            keySound.play();
            break;
          case 89:
            oscillator.frequency.value = notesByKeyCode[5][1];
            $('#keyboard div:nth-child(5)').addClass('notepressed');
            keySound.play();
            break;
          case 85:
            oscillator.frequency.value = notesByKeyCode[6][1];
            $('#keyboard div:nth-child(4)').addClass('notepressed');
            keySound.play();
            break;
          case 73:
            oscillator.frequency.value = notesByKeyCode[7][1];
            $('#keyboard div:nth-child(3)').addClass('notepressed');
            keySound.play();
            break;
          case 79:
            oscillator.frequency.value = notesByKeyCode[8][1];
            $('#keyboard div:nth-child(2)').addClass('notepressed');
            keySound.play();
            break;
          case 80:
            oscillator.frequency.value = notesByKeyCode[9][1];
            $('#keyboard div:nth-child(1)').addClass('notepressed');
            keySound.play();
            break;

        }
    }

    function endNote(){
      keySound.stop();
      $('#keyboard div').removeClass('notepressed');
      
    }


    // console.log("before" + gainNode.gain.value);


  window.addEventListener('keydown', startNote);
  window.addEventListener('keyup', endNote);
  // // window.addEventListener('keydown', noteGain);
    }; 

  window.addEventListener('load', function() {
      loadKeyboard();

  });

  // document.getElementById('slider').addEventListener('input',function(event){
  //   gainNode.gain.value = event.target.value;
  // });
 

})();


