


var audioCtx = new AudioContext();

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

this.oscillator = audioCtx.createOscillator();
// this.oscillator.frequency.value;
this.oscillator.type = 'triangle';
this.oscillator.start(0);

function noteConnect(){
  this.oscillator.connect(audioCtx.destination);
}

function noteDisconnect(){
  this.oscillator.disconnect();
}

function startNote(event){
  var keyCode = event.keyCode;
  for (key in notesByKeyCode) {
    switch (keyCode) {
      case 81:
        this.oscillator.frequency.value = notesByKeyCode[0][1];
        $('#keyboard div:nth-child(10)').addClass('notepressed');
        noteConnect();
        break;
      case 87:
        this.oscillator.frequency.value = notesByKeyCode[1][1];
        $('#keyboard div:nth-child(9)').addClass('notepressed');
        noteConnect();
        break;
      case 69:
        this.oscillator.frequency.value = notesByKeyCode[2][1];
        $('#keyboard div:nth-child(8)').addClass('notepressed');
        noteConnect();
        break;
      case 82:
        this.oscillator.frequency.value = notesByKeyCode[3][1];
        $('#keyboard div:nth-child(7)').addClass('notepressed');
        noteConnect();
        break;
      case 84:
        this.oscillator.frequency.value = notesByKeyCode[4][1];
        $('#keyboard div:nth-child(6)').addClass('notepressed');
        noteConnect();
        break;
      case 89:
        this.oscillator.frequency.value = notesByKeyCode[5][1];
        $('#keyboard div:nth-child(5)').addClass('notepressed');
        noteConnect();
        break;
      case 85:
        this.oscillator.frequency.value = notesByKeyCode[6][1];
        $('#keyboard div:nth-child(4)').addClass('notepressed');
        noteConnect();
        break;
      case 73:
        this.oscillator.frequency.value = notesByKeyCode[7][1];
        $('#keyboard div:nth-child(3)').addClass('notepressed');
        noteConnect();
        break;
      case 79:
        this.oscillator.frequency.value = notesByKeyCode[8][1];
        $('#keyboard div:nth-child(2)').addClass('notepressed');
        noteConnect();
        break;
      case 80:
        this.oscillator.frequency.value = notesByKeyCode[9][1];
        $('#keyboard div:nth-child(1)').addClass('notepressed');
        noteConnect();
        break;

    }
  }
}

function endNote(){
  $('#keyboard div').removeClass('notepressed');
  noteDisconnect();
}

window.addEventListener('keydown', startNote);
window.addEventListener('keyup', endNote);













